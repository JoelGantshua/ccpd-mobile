var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Transform } from 'class-transformer';
import { IsString, IsIn, MinLength, MaxLength, } from 'class-validator';
export class SaveArticleDto {
    title;
    summary;
    content;
    category;
}
__decorate([
    Transform(({ value }) => typeof value === 'string' ? value.trim() : value),
    IsString(),
    MinLength(3),
    MaxLength(250),
    __metadata("design:type", String)
], SaveArticleDto.prototype, "title", void 0);
__decorate([
    Transform(({ value }) => typeof value === 'string' ? value.trim() : value),
    IsString(),
    MinLength(10),
    MaxLength(1000),
    __metadata("design:type", String)
], SaveArticleDto.prototype, "summary", void 0);
__decorate([
    Transform(({ value }) => typeof value === 'string' ? value.trim() : value),
    IsString(),
    MinLength(20),
    MaxLength(50000),
    __metadata("design:type", String)
], SaveArticleDto.prototype, "content", void 0);
__decorate([
    IsIn(['POLITIQUE', 'ECONOMIE']),
    __metadata("design:type", String)
], SaveArticleDto.prototype, "category", void 0);
//# sourceMappingURL=save-article.dto.js.map