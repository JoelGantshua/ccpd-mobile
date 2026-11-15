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
import { Controller, ForbiddenException, Get, Req, UseGuards, } from '@nestjs/common';
import { JwtAccessGuard } from './jwt-access.guard.js';
import { ProvincialMembersService } from './provincial-members.service.js';
let ProvincialMembersController = class ProvincialMembersController {
    provincialMembers;
    constructor(provincialMembers) {
        this.provincialMembers = provincialMembers;
    }
    requireProvincialAccess(request) {
        if (request.user.role !== 'RESPONSABLE_PROVINCIAL' ||
            !request.user.provinceId) {
            throw new ForbiddenException('Acces reserve aux responsables provinciaux');
        }
        return request.user.provinceId;
    }
    async members(request) {
        const provinceId = this.requireProvincialAccess(request);
        return this.provincialMembers.findMembers(provinceId);
    }
    async pending(request) {
        const provinceId = this.requireProvincialAccess(request);
        return this.provincialMembers.findPending(provinceId);
    }
};
__decorate([
    Get(),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProvincialMembersController.prototype, "members", null);
__decorate([
    Get('pending'),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProvincialMembersController.prototype, "pending", null);
ProvincialMembersController = __decorate([
    Controller('provincial/members'),
    UseGuards(JwtAccessGuard),
    __metadata("design:paramtypes", [ProvincialMembersService])
], ProvincialMembersController);
export { ProvincialMembersController };
//# sourceMappingURL=provincial-members.controller.js.map