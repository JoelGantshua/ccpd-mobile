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
import { Body, Controller, Get, Header, Param, ParseUUIDPipe, Patch, Post, Query, StreamableFile, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { JwtAccessGuard } from './jwt-access.guard.js';
import { AdminGuard } from './admin.guard.js';
import { PublicationsService } from '../publications/publications.service.js';
import { CreatePublicationDto } from '../publications/dto/create-publication.dto.js';
let AdminPublicationsController = class AdminPublicationsController {
    publications;
    constructor(publications) {
        this.publications = publications;
    }
    list(type, page) {
        return this.publications.adminList(type, page);
    }
    detail(id) {
        return this.publications.adminDetail(id);
    }
    create(dto) { return this.publications.createDraft(dto); }
    update(id, dto) {
        return this.publications.adminUpdate(id, dto);
    }
    upload(id, file) {
        return this.publications.attachPdf(id, file);
    }
    async preview(id) {
        const buffer = await this.publications.getAdminPdf(id);
        return new StreamableFile(buffer, { type: 'application/pdf', disposition: 'inline', length: buffer.length });
    }
    publish(id) { return this.publications.publish(id); }
    archive(id) { return this.publications.adminStatus(id, 'ARCHIVED'); }
    draft(id) { return this.publications.adminStatus(id, 'DRAFT'); }
};
__decorate([
    Get(),
    __param(0, Query('type')),
    __param(1, Query('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AdminPublicationsController.prototype, "list", null);
__decorate([
    Get(':id'),
    __param(0, Param('id', new ParseUUIDPipe({ version: '4' }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminPublicationsController.prototype, "detail", null);
__decorate([
    Post(),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreatePublicationDto]),
    __metadata("design:returntype", void 0)
], AdminPublicationsController.prototype, "create", null);
__decorate([
    Patch(':id'),
    __param(0, Param('id', new ParseUUIDPipe({ version: '4' }))),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, CreatePublicationDto]),
    __metadata("design:returntype", void 0)
], AdminPublicationsController.prototype, "update", null);
__decorate([
    Post(':id/file'),
    UseInterceptors(FileInterceptor('file', { storage: memoryStorage(), limits: { fileSize: 10 * 1024 * 1024, files: 1, fields: 0, parts: 1 } })),
    __param(0, Param('id', new ParseUUIDPipe({ version: '4' }))),
    __param(1, UploadedFile()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AdminPublicationsController.prototype, "upload", null);
__decorate([
    Get(':id/file'),
    Header('Cache-Control', 'private, no-store'),
    Header('X-Content-Type-Options', 'nosniff'),
    __param(0, Param('id', new ParseUUIDPipe({ version: '4' }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminPublicationsController.prototype, "preview", null);
__decorate([
    Patch(':id/publish'),
    __param(0, Param('id', new ParseUUIDPipe({ version: '4' }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminPublicationsController.prototype, "publish", null);
__decorate([
    Patch(':id/archive'),
    __param(0, Param('id', new ParseUUIDPipe({ version: '4' }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminPublicationsController.prototype, "archive", null);
__decorate([
    Patch(':id/draft'),
    __param(0, Param('id', new ParseUUIDPipe({ version: '4' }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminPublicationsController.prototype, "draft", null);
AdminPublicationsController = __decorate([
    Controller('admin/publications'),
    UseGuards(JwtAccessGuard, AdminGuard),
    __metadata("design:paramtypes", [PublicationsService])
], AdminPublicationsController);
export { AdminPublicationsController };
//# sourceMappingURL=admin-publications.controller.js.map