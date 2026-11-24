var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable, ForbiddenException, UnauthorizedException, } from '@nestjs/common';
let AdminGuard = class AdminGuard {
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        if (!request.user?.id) {
            throw new UnauthorizedException('Authentification requise.');
        }
        if (request.user.role !== 'ADMIN') {
            throw new ForbiddenException('Acces reserve aux administrateurs.');
        }
        return true;
    }
};
AdminGuard = __decorate([
    Injectable()
], AdminGuard);
export { AdminGuard };
//# sourceMappingURL=admin.guard.js.map