var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BadRequestException, Injectable, NotFoundException, } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { ConflictException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
let PublicationsService = class PublicationsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findPublished(type, pageInput) {
        if (type !== undefined &&
            type !== 'DOCUMENT' &&
            type !== 'DOCTRINE') {
            throw new BadRequestException('Type de publication invalide.');
        }
        const page = pageInput === undefined
            ? 1
            : Number(pageInput);
        if (!Number.isSafeInteger(page) ||
            page < 1 ||
            page > 100000) {
            throw new BadRequestException('Page invalide.');
        }
        const where = {
            status: 'PUBLISHED',
            ...(type ? { type: type } : {}),
        };
        const take = 20;
        const skip = (page - 1) * take;
        const [items, total] = await Promise.all([
            this.prisma.publication.findMany({
                where,
                select: {
                    id: true,
                    title: true,
                    description: true,
                    type: true,
                    publishedAt: true,
                },
                orderBy: [
                    { publishedAt: 'desc' },
                    { id: 'asc' },
                ],
                skip,
                take,
            }),
            this.prisma.publication.count({ where }),
        ]);
        return {
            success: true,
            items,
            pagination: {
                page,
                pageSize: take,
                total,
                totalPages: Math.ceil(total / take),
            },
        };
    }
    async findPublishedById(id) {
        const publication = await this.prisma.publication.findFirst({
            where: {
                id,
                status: 'PUBLISHED',
            },
            select: {
                id: true,
                title: true,
                description: true,
                type: true,
                publishedAt: true,
            },
        });
        if (!publication) {
            throw new NotFoundException('Publication introuvable.');
        }
        return {
            success: true,
            publication,
        };
    }
    async createDraft(dto) {
        const title = dto.title?.trim();
        const description = dto.description?.trim() || null;
        if (!title || title.length < 3 || title.length > 200) {
            throw new BadRequestException('Le titre doit contenir entre 3 et 200 caractères.');
        }
        if (description && description.length > 2000) {
            throw new BadRequestException('La description est trop longue.');
        }
        if (dto.type !== 'DOCUMENT' && dto.type !== 'DOCTRINE') {
            throw new BadRequestException('Type de publication invalide.');
        }
        const metadata = await this.adminMetadata(dto);
        const publication = await this.prisma.publication.create({
            data: {
                title,
                description,
                type: dto.type,
                ...metadata,
                status: 'DRAFT',
            },
            select: {
                id: true,
                title: true,
                description: true,
                type: true,
                status: true,
                createdAt: true,
            },
        }).catch((error) => {
            if (typeof error === 'object' && error !== null && 'code' in error && error.code === 'P2002') {
                throw new ConflictException('Version de doctrine deja existante.');
            }
            throw error;
        });
        return {
            success: true,
            message: 'Brouillon créé avec succès.',
            publication,
        };
    }
    async attachPdf(id, file) {
        if (!file?.buffer?.length) {
            throw new BadRequestException('Veuillez sélectionner un fichier PDF.');
        }
        const maxSize = 10 * 1024 * 1024;
        if (file.size > maxSize) {
            throw new BadRequestException('Le PDF ne doit pas dépasser 10 Mo.');
        }
        const header = file.buffer.subarray(0, 5).toString('ascii');
        const tail = file.buffer
            .subarray(Math.max(0, file.buffer.length - 1024))
            .toString('latin1');
        if (header !== '%PDF-' || !tail.includes('%%EOF')) {
            throw new BadRequestException('Le fichier ne semble pas être un PDF valide.');
        }
        const publication = await this.prisma.publication.findUnique({
            where: { id },
            select: {
                id: true,
                status: true,
                storageKey: true,
            },
        });
        if (!publication) {
            throw new NotFoundException('Publication introuvable.');
        }
        if (publication.status !== 'DRAFT') {
            throw new ConflictException('Seul un brouillon peut recevoir un nouveau PDF.');
        }
        const folder = join(process.cwd(), 'uploads', 'publications');
        const storageKey = `${randomUUID()}.pdf`;
        const filePath = join(folder, storageKey);
        await mkdir(folder, { recursive: true });
        await writeFile(filePath, file.buffer, { flag: 'wx' });
        const result = await this.prisma.publication.updateMany({
            where: { id, status: 'DRAFT', storageKey: publication.storageKey },
            data: { fileName: file.originalname.slice(0, 255), storageKey, mimeType: 'application/pdf', fileSize: file.buffer.length },
        });
        if (result.count !== 1)
            throw new ConflictException('Publication modifiee.');
        const updated = await this.prisma.publication.findUniqueOrThrow({ where: { id }, select: this.adminSelect });
        return {
            success: true,
            message: 'PDF enregistré avec succès.',
            publication: updated,
        };
    }
    async getPublishedPdf(id) {
        return this.readPdf(id, true);
    }
    async getAdminPdf(id) {
        return this.readPdf(id, false);
    }
    async readPdf(id, publicOnly) {
        const publication = await this.prisma.publication.findFirst({
            where: {
                id,
                ...(publicOnly ? { status: 'PUBLISHED' } : {}),
            },
            select: {
                storageKey: true,
                mimeType: true,
                fileSize: true,
            },
        });
        if (!publication?.storageKey) {
            throw new NotFoundException('PDF indisponible.');
        }
        if (!/^(?:[a-f0-9]{64}|[a-f0-9-]{36})\.pdf$/i.test(publication.storageKey)) {
            throw new NotFoundException('PDF indisponible.');
        }
        const filePath = join(process.cwd(), 'uploads', 'publications', publication.storageKey);
        try {
            const buffer = await readFile(filePath);
            if (buffer.length === 0 ||
                buffer.length > 10 * 1024 * 1024 ||
                buffer.subarray(0, 5).toString('ascii') !== '%PDF-') {
                throw new NotFoundException('PDF indisponible.');
            }
            return buffer;
        }
        catch {
            throw new NotFoundException('PDF indisponible.');
        }
    }
    async publish(id) {
        const publication = await this.prisma.publication.findUnique({
            where: { id },
            select: {
                id: true,
                status: true,
                storageKey: true,
                type: true,
                doctrineNumber: true,
                doctrineVersion: true,
                mimeType: true,
                fileSize: true,
            },
        });
        if (!publication) {
            throw new NotFoundException('Publication introuvable.');
        }
        if (publication.status !== 'DRAFT') {
            throw new ConflictException('Seul un brouillon peut être publié.');
        }
        if (publication.type === 'DOCTRINE' && (!publication.doctrineNumber || publication.doctrineNumber < 1 || publication.doctrineNumber > 15 || !['COURTE', 'INTEGRALE'].includes(publication.doctrineVersion ?? '')))
            throw new BadRequestException('Metadonnees doctrine invalides.');
        const key = publication.storageKey;
        if (!key ||
            !/^(?:[a-f0-9]{64}|[a-f0-9-]{36})\.pdf$/i.test(key) ||
            publication.mimeType !== 'application/pdf' ||
            !publication.fileSize) {
            throw new BadRequestException('Un fichier PDF valide est obligatoire avant publication.');
        }
        const filePath = join(process.cwd(), 'uploads', 'publications', key);
        let buffer;
        try {
            buffer = await readFile(filePath);
        }
        catch {
            throw new BadRequestException('Le fichier PDF est introuvable sur le serveur.');
        }
        const tail = buffer
            .subarray(Math.max(0, buffer.length - 1024))
            .toString('latin1');
        if (buffer.length === 0 ||
            buffer.length > 10 * 1024 * 1024 ||
            buffer.length !== publication.fileSize ||
            buffer.subarray(0, 5).toString('ascii') !== '%PDF-' ||
            !tail.includes('%%EOF')) {
            throw new BadRequestException('Le fichier PDF ne passe pas les vérifications.');
        }
        if (/^[a-f0-9]{64}\.pdf$/i.test(key)) {
            const actualHash = createHash('sha256')
                .update(buffer)
                .digest('hex');
            if (`${actualHash}.pdf` !== key.toLowerCase()) {
                throw new BadRequestException('Le fichier PDF a été modifié.');
            }
        }
        const result = await this.prisma.publication.updateMany({
            where: {
                id,
                status: 'DRAFT',
                storageKey: key,
            },
            data: {
                status: 'PUBLISHED',
                publishedAt: new Date(),
            },
        });
        if (result.count !== 1) {
            throw new ConflictException('Publication modifiée entre-temps. Réessayez.');
        }
        return {
            success: true,
            message: 'Publication mise en ligne avec succès.',
            publication: await this.prisma.publication.findUniqueOrThrow({
                where: { id },
                select: {
                    id: true,
                    title: true,
                    type: true,
                    status: true,
                    publishedAt: true,
                },
            }),
        };
    }
    async findPublishedDoctrines() {
        const publications = await this.prisma.publication.findMany({
            where: {
                type: 'DOCTRINE',
                status: 'PUBLISHED',
                doctrineNumber: {
                    gte: 1,
                    lte: 15,
                },
                doctrineVersion: {
                    in: ['COURTE', 'INTEGRALE'],
                },
            },
            select: {
                id: true,
                title: true,
                description: true,
                doctrineNumber: true,
                doctrineVersion: true,
                publishedAt: true,
            },
            orderBy: [
                { doctrineNumber: 'asc' },
                { doctrineVersion: 'asc' },
            ],
        });
        const doctrines = new Map();
        for (const publication of publications) {
            const number = publication.doctrineNumber;
            if (number === null) {
                continue;
            }
            const doctrine = doctrines.get(number) ?? {
                number,
                title: `Doctrine ${String(number).padStart(2, '0')} - ${publication.title
                    .replace(/^(?:CCPD\s+)?Doctrine\s+\d+\s*[-–—:]?\s*/i, '')
                    .replace(/\s*[-–—]?\s*version\s+(?:courte|int[eé]grale)\s*$/i, '')
                    .trim()}`,
                courte: null,
                integrale: null,
            };
            const version = {
                id: publication.id,
                title: publication.title,
            };
            if (publication.doctrineVersion === 'COURTE') {
                doctrine.courte = version;
            }
            if (publication.doctrineVersion === 'INTEGRALE') {
                doctrine.integrale = version;
            }
            doctrines.set(number, doctrine);
        }
        return {
            success: true,
            items: Array.from(doctrines.values()),
            total: doctrines.size,
        };
    }
    adminSelect = {
        id: true, title: true, description: true, type: true, status: true, doctrineNumber: true, doctrineVersion: true,
        fileName: true, fileSize: true, createdAt: true, updatedAt: true, publishedAt: true,
    };
    async adminMetadata(dto, id) {
        if (dto.type === 'DOCUMENT') {
            if (dto.doctrineNumber != null || dto.doctrineVersion != null)
                throw new BadRequestException('Metadonnees doctrine interdites pour un document.');
            return { doctrineNumber: null, doctrineVersion: null };
        }
        if (!Number.isInteger(dto.doctrineNumber) || dto.doctrineNumber < 1 || dto.doctrineNumber > 15 || !['COURTE', 'INTEGRALE'].includes(dto.doctrineVersion ?? ''))
            throw new BadRequestException('Numero et version obligatoires.');
        if (!id)
            return { doctrineNumber: dto.doctrineNumber, doctrineVersion: dto.doctrineVersion };
        const existing = await this.prisma.publication.findUnique({ where: { id } });
        if (!existing || existing.doctrineNumber !== dto.doctrineNumber || existing.doctrineVersion !== dto.doctrineVersion)
            throw new ConflictException('Identite de doctrine non modifiable.');
        return { doctrineNumber: dto.doctrineNumber, doctrineVersion: dto.doctrineVersion };
    }
    async adminList(type, pageInput) {
        if (type !== 'DOCUMENT' && type !== 'DOCTRINE')
            throw new BadRequestException('Type invalide.');
        if (pageInput !== undefined && (typeof pageInput !== 'string' || !/^[1-9]\d{0,4}$/.test(pageInput)))
            throw new BadRequestException('Page invalide.');
        const page = Number(pageInput ?? 1), pageSize = 50;
        const where = { type: type };
        const [items, total] = await Promise.all([
            this.prisma.publication.findMany({ where, select: this.adminSelect, skip: (page - 1) * pageSize, take: pageSize, orderBy: [{ doctrineNumber: 'asc' }, { doctrineVersion: 'asc' }, { updatedAt: 'desc' }, { id: 'asc' }] }),
            this.prisma.publication.count({ where }),
        ]);
        return { success: true, items, pagination: { page, pageSize, total, totalPages: Math.ceil(total / pageSize) } };
    }
    async adminDetail(id) {
        const publication = await this.prisma.publication.findUnique({ where: { id }, select: this.adminSelect });
        if (!publication)
            throw new NotFoundException('Publication introuvable.');
        return { success: true, publication };
    }
    async adminUpdate(id, dto) {
        const { publication } = await this.adminDetail(id);
        if (publication.type !== dto.type)
            throw new ConflictException('Type non modifiable.');
        const title = dto.title.trim();
        if (title.length < 3)
            throw new BadRequestException('Titre invalide.');
        const metadata = await this.adminMetadata(dto, id);
        const result = await this.prisma.publication.updateMany({ where: { id, status: 'DRAFT', updatedAt: publication.updatedAt }, data: { title, description: dto.description?.trim() || null, ...metadata } });
        if (result.count !== 1)
            throw new ConflictException('Brouillon requis ou publication modifiee.');
        return this.adminDetail(id);
    }
    async adminStatus(id, status) {
        const result = await this.prisma.publication.updateMany({ where: { id, status: { in: status === 'DRAFT' ? ['PUBLISHED', 'ARCHIVED'] : ['DRAFT', 'PUBLISHED'] } }, data: { status, ...(status === 'DRAFT' ? { publishedAt: null } : {}) } });
        if (result.count !== 1)
            throw new ConflictException('Transition impossible.');
        return this.adminDetail(id);
    }
};
PublicationsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], PublicationsService);
export { PublicationsService };
//# sourceMappingURL=publications.service.js.map