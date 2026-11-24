var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module.js';
import { AuthModule } from '../auth/auth.module.js';
import { AdminGuard } from '../auth/admin.guard.js';
import { ArticlesController } from './articles.controller.js';
import { AdminArticlesController } from './admin-articles.controller.js';
import { ArticlesService } from './articles.service.js';
let ArticlesModule = class ArticlesModule {
};
ArticlesModule = __decorate([
    Module({
        imports: [PrismaModule, AuthModule],
        controllers: [
            ArticlesController,
            AdminArticlesController,
        ],
        providers: [
            ArticlesService,
            AdminGuard,
        ],
        exports: [ArticlesService],
    })
], ArticlesModule);
export { ArticlesModule };
//# sourceMappingURL=articles.module.js.map