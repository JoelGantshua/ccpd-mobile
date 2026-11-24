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
import { Controller, Get, Patch, Param, Query, ParseUUIDPipe, UseGuards, } from '@nestjs/common';
import { JwtAccessGuard } from './jwt-access.guard.js';
import { AdminGuard } from './admin.guard.js';
import { AdminInstitutionService } from './admin-institution.service.js';
let AdminInstitutionController = class AdminInstitutionController {
    institution;
    constructor(institution) {
        this.institution = institution;
    }
    members(provinceId, page) {
        return this.institution.members(provinceId, page);
    }
    opinions(provinceId, page) {
        return this.institution.opinions(provinceId, page);
    }
    participations(provinceId, page) {
        return this.institution.participations(provinceId, page);
    }
    statistics() {
        return this.institution.statistics();
    }
    approveOpinion(id) {
        return this.institution.moderateOpinion(id, 'APPROVED');
    }
    rejectOpinion(id) {
        return this.institution.moderateOpinion(id, 'REJECTED');
    }
    approveParticipation(id) {
        return this.institution.moderateParticipation(id, 'APPROVED');
    }
    rejectParticipation(id) {
        return this.institution.moderateParticipation(id, 'REJECTED');
    }
};
__decorate([
    Get('members'),
    __param(0, Query('provinceId')),
    __param(1, Query('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AdminInstitutionController.prototype, "members", null);
__decorate([
    Get('opinions'),
    __param(0, Query('provinceId')),
    __param(1, Query('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AdminInstitutionController.prototype, "opinions", null);
__decorate([
    Get('participations'),
    __param(0, Query('provinceId')),
    __param(1, Query('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AdminInstitutionController.prototype, "participations", null);
__decorate([
    Get('statistics'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminInstitutionController.prototype, "statistics", null);
__decorate([
    Patch('opinions/:id/approve'),
    __param(0, Param('id', new ParseUUIDPipe({ version: '4' }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminInstitutionController.prototype, "approveOpinion", null);
__decorate([
    Patch('opinions/:id/reject'),
    __param(0, Param('id', new ParseUUIDPipe({ version: '4' }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminInstitutionController.prototype, "rejectOpinion", null);
__decorate([
    Patch('participations/:id/approve'),
    __param(0, Param('id', new ParseUUIDPipe({ version: '4' }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminInstitutionController.prototype, "approveParticipation", null);
__decorate([
    Patch('participations/:id/reject'),
    __param(0, Param('id', new ParseUUIDPipe({ version: '4' }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminInstitutionController.prototype, "rejectParticipation", null);
AdminInstitutionController = __decorate([
    Controller('admin'),
    UseGuards(JwtAccessGuard, AdminGuard),
    __metadata("design:paramtypes", [AdminInstitutionService])
], AdminInstitutionController);
export { AdminInstitutionController };
//# sourceMappingURL=admin-institution.controller.js.map