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
import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards, UsePipes, ValidationPipe, } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { JwtAccessGuard } from '../auth/jwt-access.guard.js';
import { AvisService } from './avis.service.js';
import { CreateAvisDto } from './dto/create-avis.dto.js';
let AvisController = class AvisController {
    avisService;
    constructor(avisService) {
        this.avisService = avisService;
    }
    create(dto, request) {
        return this.avisService.create(dto, request.user);
    }
};
__decorate([
    Post(),
    UseGuards(JwtAccessGuard),
    HttpCode(HttpStatus.CREATED),
    Throttle({
        default: {
            limit: 5,
            ttl: 60_000,
        },
    }),
    UsePipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    })),
    __param(0, Body()),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateAvisDto, Object]),
    __metadata("design:returntype", void 0)
], AvisController.prototype, "create", null);
AvisController = __decorate([
    Controller('avis'),
    __metadata("design:paramtypes", [AvisService])
], AvisController);
export { AvisController };
//# sourceMappingURL=avis.controller.js.map