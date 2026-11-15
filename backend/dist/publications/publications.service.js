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
import { mkdir, unlink, writeFile } from 'node:fs/promises';
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
        const publication = await this.prisma.publication.create({
            data: {
                title,
                description,
                type: dto.type,
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
        let updated;
        try {
            const result = await this.prisma.publication.updateMany({
                where: {
                    id,
                    status: 'DRAFT',
                    storageKey: publication.storageKey,
                },
                data: {
                    fileName: file.originalname.slice(0, 255),
                    storageKey,
                    mimeType: 'application/pdf',
                    fileSize: file.size,
                },
            });
            if (result.count !== 1) {
                throw new ConflictException('La publication a été modifiée. Veuillez réessayer.');
            }
            updated = await this.prisma.publication.findUniqueOrThrow({
                where: { id },
                select: {
                    id: true,
                    title: true,
                    type: true,
                    status: true,
                    fileName: true,
                    fileSize: true,
                },
            });
        }
        catch (error) {
            await unlink(filePath).catch(() => undefined);
            throw error;
        }
        if (publication.storageKey) {
            const previousPath = join(folder, publication.storageKey);
            await unlink(previousPath).catch(() => undefined);
        }
        return {
            success: true,
            message: 'PDF enregistré avec succès.',
            publication: updated,
        };
    }
    async getPublishedPdf(id) {
        const publication = await this.prisma.publication.findFirst({
            where: {
                id,
                status: 'PUBLISHED',
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
                title: `Doctrine ${String(number).padStart(2, '0')}`,
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
};
PublicationsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], PublicationsService);
export { PublicationsService };
//# sourceMappingURL=publications.service.js.map