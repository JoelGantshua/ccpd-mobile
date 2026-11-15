var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Body, Controller, ForbiddenException, Patch, Post, Req, UseGuards, UsePipes, ValidationPipe, } from '@nestjs/common';
import { Param, ParseUUIDPipe, UploadedFile, UseInterceptors, } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { JwtAccessGuard } from './jwt-access.guard.js';
import { PublicationsService } from '../publications/publications.service.js';
import { CreatePublicationDto } from '../publications/dto/create-publication.dto.js';
let AdminPublicationsController = class AdminPublicationsController {
    publications;
    constructor(publications) {
        this.publications = publications;
    }
    create(request, dto) {
        if (request.user.role !== 'ADMIN') {
            throw new ForbiddenException('Accès réservé aux administrateurs.');
        }
        return this.publications.createDraft(dto);
    }
    uploadPdf(request, id, file) {
        if (request.user.role !== 'ADMIN') {
            throw new ForbiddenException('Accès réservé aux administrateurs.');
        }
        return this.publications.attachPdf(id, file);
    }
    publish(request, id) {
        if (request.user.role !== 'ADMIN') {
            throw new ForbiddenException('Accès réservé aux administrateurs.');
        }
        return this.publications.publish(id);
    }
};
__decorate([
    Post(),
    UsePipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    })),
    __param(0, Req()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CreatePublicationDto]),
    __metadata("design:returntype", void 0)
], AdminPublicationsController.prototype, "create", null);
__decorate([
    Post(':id/file'),
    UseInterceptors(FileInterceptor('file', {
        storage: memoryStorage(),
        limits: {
            fileSize: 10 * 1024 * 1024,
            files: 1,
            fields: 0,
            parts: 1,
        },
    })),
    __param(0, Req()),
    __param(1, Param('id', new ParseUUIDPipe({ version: '4' }))),
    __param(2, UploadedFile()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], AdminPublicationsController.prototype, "uploadPdf", null);
__decorate([
    Patch(':id/publish'),
    __param(0, Req()),
    __param(1, Param('id', new ParseUUIDPipe({ version: '4' }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AdminPublicationsController.prototype, "publish", null);
AdminPublicationsController = __decorate([
    Controller('admin/publications'),
    UseGuards(JwtAccessGuard),
    __metadata("design:paramtypes", [PublicationsService])
], AdminPublicationsController);
export { AdminPublicationsController };
//# sourceMappingURL=admin-publications.controller.js.map