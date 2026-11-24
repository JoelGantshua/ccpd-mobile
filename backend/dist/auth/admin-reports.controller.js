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
import { Controller, Get, Query, Header, StreamableFile, UseGuards } from '@nestjs/common';
import { JwtAccessGuard } from './jwt-access.guard.js';
import { AdminGuard } from './admin.guard.js';
import { AdminReportsService } from './admin-reports.service.js';
let AdminReportsController = class AdminReportsController {
    reports;
    constructor(reports) {
        this.reports = reports;
    }
    async excel(kind = 'all', scope = 'all') {
        const data = await this.reports.generate(kind, scope);
        return new StreamableFile(data, { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', disposition: 'attachment; filename="CCPD_Rapport.xlsx"', length: data.length });
    }
};
__decorate([
    Get('excel'),
    Header('Cache-Control', 'private, no-store'),
    Header('X-Content-Type-Options', 'nosniff'),
    __param(0, Query('kind')),
    __param(1, Query('scope')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminReportsController.prototype, "excel", null);
AdminReportsController = __decorate([
    Controller('admin/reports'),
    UseGuards(JwtAccessGuard, AdminGuard),
    __metadata("design:paramtypes", [AdminReportsService])
], AdminReportsController);
export { AdminReportsController };
//# sourceMappingURL=admin-reports.controller.js.map