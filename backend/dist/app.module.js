var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { EditorialImagesModule } from './editorial-images/editorial-images.module.js';
import { Module } from '@nestjs/common';
import { CommitteeModule } from './committee/committee.module.js';
import { ArticlesModule } from './articles/articles.module.js';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { HealthController } from './health/health.controller.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { ProvincesModule } from './provinces/provinces.module.js';
import { AuthModule } from './auth/auth.module.js';
import { UsersModule } from './users/users.module.js';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AvisModule } from './avis/avis.module.js';
import { PublicationsModule } from './publications/publications.module.js';
import { ParticipationsModule } from './participations/participations.module.js';
let AppModule = class AppModule {
};
AppModule = __decorate([
    Module({
        imports: [
            EditorialImagesModule,
            ConfigModule.forRoot({ isGlobal: true }),
            PrismaModule,
            CommitteeModule,
            ArticlesModule,
            ProvincesModule,
            AuthModule,
            UsersModule,
            AvisModule,
            ParticipationsModule,
            PublicationsModule,
            ThrottlerModule.forRoot([
                {
                    ttl: 60_000,
                    limit: 60,
                },
            ]),
        ],
        controllers: [AppController, HealthController],
        providers: [
            AppService,
            {
                provide: APP_GUARD,
                useClass: ThrottlerGuard,
            },
        ],
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map