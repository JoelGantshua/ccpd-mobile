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
import { Controller, Get, Param, ParseUUIDPipe, Query, } from '@nestjs/common';
import { PublicationsService } from './publications.service.js';
import { StreamableFile } from '@nestjs/common';
let PublicationsController = class PublicationsController {
    publicationsService;
    constructor(publicationsService) {
        this.publicationsService = publicationsService;
    }
    findPublished(type, page) {
        return this.publicationsService.findPublished(type, page);
    }
    findPublishedDoctrines() {
        return this.publicationsService.findPublishedDoctrines();
    }
    findPublishedById(id) {
        return this.publicationsService.findPublishedById(id);
    }
    async getPdf(id) {
        const buffer = await this.publicationsService.getPublishedPdf(id);
        return new StreamableFile(buffer, {
            type: 'application/pdf',
            disposition: `inline; filename="publication-${id}.pdf"`,
            length: buffer.length,
        });
    }
};
__decorate([
    Get(),
    __param(0, Query('type')),
    __param(1, Query('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], PublicationsController.prototype, "findPublished", null);
__decorate([
    Get('doctrines'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PublicationsController.prototype, "findPublishedDoctrines", null);
__decorate([
    Get(':id'),
    __param(0, Param('id', new ParseUUIDPipe({ version: '4' }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PublicationsController.prototype, "findPublishedById", null);
__decorate([
    Get(':id/file'),
    __param(0, Param('id', new ParseUUIDPipe({ version: '4' }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PublicationsController.prototype, "getPdf", null);
PublicationsController = __decorate([
    Controller('publications'),
    __metadata("design:paramtypes", [PublicationsService])
], PublicationsController);
export { PublicationsController };
//# sourceMappingURL=publications.controller.js.map