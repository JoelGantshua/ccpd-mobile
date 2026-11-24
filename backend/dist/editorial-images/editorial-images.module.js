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
import { EditorialImagesService, } from './editorial-images.service.js';
import { AdminEditorialImagesController, PublicEditorialImagesController, } from './editorial-images.controller.js';
let EditorialImagesModule = class EditorialImagesModule {
};
EditorialImagesModule = __decorate([
    Module({
        imports: [
            PrismaModule,
            AuthModule,
        ],
        controllers: [
            AdminEditorialImagesController,
            PublicEditorialImagesController,
        ],
        providers: [
            EditorialImagesService,
            AdminGuard,
        ],
    })
], EditorialImagesModule);
export { EditorialImagesModule };
//# sourceMappingURL=editorial-images.module.js.map