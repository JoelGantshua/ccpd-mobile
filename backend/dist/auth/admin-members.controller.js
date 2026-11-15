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
import { Controller, ForbiddenException, Get, Param, ParseUUIDPipe, Patch, Req, UseGuards, } from '@nestjs/common';
import { JwtAccessGuard } from './jwt-access.guard.js';
import { AdminMembersService } from './admin-members.service.js';
let AdminMembersController = class AdminMembersController {
    adminMembers;
    constructor(adminMembers) {
        this.adminMembers = adminMembers;
    }
    requireAdmin(request) {
        if (request.user.role !== 'ADMIN') {
            throw new ForbiddenException('Accès réservé aux administrateurs');
        }
    }
    async pending(request) {
        this.requireAdmin(request);
        return this.adminMembers.findPending();
    }
    async approve(request, id) {
        this.requireAdmin(request);
        return this.adminMembers.approveMember(id);
    }
};
__decorate([
    Get('pending'),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminMembersController.prototype, "pending", null);
__decorate([
    Patch(':id/approve'),
    __param(0, Req()),
    __param(1, Param('id', new ParseUUIDPipe({ version: '4' }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AdminMembersController.prototype, "approve", null);
AdminMembersController = __decorate([
    Controller('admin/members'),
    UseGuards(JwtAccessGuard),
    __metadata("design:paramtypes", [AdminMembersService])
], AdminMembersController);
export { AdminMembersController };
//# sourceMappingURL=admin-members.controller.js.map