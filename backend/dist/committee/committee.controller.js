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
import { Controller, Get, Param, ParseUUIDPipe, } from '@nestjs/common';
import { CommitteeService } from './committee.service.js';
let CommitteeController = class CommitteeController {
    committeeService;
    constructor(committeeService) {
        this.committeeService = committeeService;
    }
    findAll() {
        return this.committeeService.findPublished();
    }
    findOne(id) {
        return this.committeeService.findPublishedById(id);
    }
};
__decorate([
    Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CommitteeController.prototype, "findAll", null);
__decorate([
    Get(':id'),
    __param(0, Param('id', new ParseUUIDPipe({ version: '4' }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CommitteeController.prototype, "findOne", null);
CommitteeController = __decorate([
    Controller('committee'),
    __metadata("design:paramtypes", [CommitteeService])
], CommitteeController);
export { CommitteeController };
//# sourceMappingURL=committee.controller.js.map