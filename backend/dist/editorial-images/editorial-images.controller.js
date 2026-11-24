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
import { Controller, Get, Post, Param, ParseUUIDPipe, UseGuards, UseInterceptors, UploadedFile, StreamableFile, Header, BadRequestException, } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAccessGuard } from '../auth/jwt-access.guard.js';
import { AdminGuard } from '../auth/admin.guard.js';
import { EditorialImagesService, } from './editorial-images.service.js';
function validateKind(value) {
    if (value !== 'committee' && value !== 'articles') {
        throw new BadRequestException('Rubrique invalide.');
    }
    return value;
}
const uploadOptions = {
    limits: {
        fileSize: 5 * 1024 * 1024,
        files: 1,
        fields: 0,
        parts: 1,
    },
};
let AdminEditorialImagesController = class AdminEditorialImagesController {
    images;
    constructor(images) {
        this.images = images;
    }
    upload(kind, id, file) {
        return this.images.upload(validateKind(kind), id, file);
    }
    async preview(kind, id) {
        const buffer = await this.images.getImage(validateKind(kind), id, false);
        return new StreamableFile(buffer, {
            type: 'image/webp',
            length: buffer.length,
        });
    }
};
__decorate([
    Post(':kind/:id/image'),
    UseInterceptors(FileInterceptor('image', uploadOptions)),
    __param(0, Param('kind')),
    __param(1, Param('id', new ParseUUIDPipe({ version: '4' }))),
    __param(2, UploadedFile()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], AdminEditorialImagesController.prototype, "upload", null);
__decorate([
    Get(':kind/:id/image'),
    Header('Cache-Control', 'private, no-store'),
    Header('X-Content-Type-Options', 'nosniff'),
    __param(0, Param('kind')),
    __param(1, Param('id', new ParseUUIDPipe({ version: '4' }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AdminEditorialImagesController.prototype, "preview", null);
AdminEditorialImagesController = __decorate([
    Controller('admin'),
    UseGuards(JwtAccessGuard, AdminGuard),
    __metadata("design:paramtypes", [EditorialImagesService])
], AdminEditorialImagesController);
export { AdminEditorialImagesController };
let PublicEditorialImagesController = class PublicEditorialImagesController {
    images;
    constructor(images) {
        this.images = images;
    }
    async committeeImage(id) {
        const buffer = await this.images.getImage('committee', id, true);
        return new StreamableFile(buffer, {
            type: 'image/webp',
            length: buffer.length,
        });
    }
    async articleImage(id) {
        const buffer = await this.images.getImage('articles', id, true);
        return new StreamableFile(buffer, {
            type: 'image/webp',
            length: buffer.length,
        });
    }
};
__decorate([
    Get('committee/:id/image'),
    Header('Cache-Control', 'no-store'),
    Header('X-Content-Type-Options', 'nosniff'),
    __param(0, Param('id', new ParseUUIDPipe({ version: '4' }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PublicEditorialImagesController.prototype, "committeeImage", null);
__decorate([
    Get('articles/:id/image'),
    Header('Cache-Control', 'no-store'),
    Header('X-Content-Type-Options', 'nosniff'),
    __param(0, Param('id', new ParseUUIDPipe({ version: '4' }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PublicEditorialImagesController.prototype, "articleImage", null);
PublicEditorialImagesController = __decorate([
    Controller(),
    __metadata("design:paramtypes", [EditorialImagesService])
], PublicEditorialImagesController);
export { PublicEditorialImagesController };
//# sourceMappingURL=editorial-images.controller.js.map