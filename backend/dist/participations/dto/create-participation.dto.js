var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsString, IsEmail, IsOptional, MinLength, MaxLength, Matches, } from 'class-validator';
import { Transform } from 'class-transformer';
export class CreateParticipationDto {
    fullName;
    email;
    phone;
    province;
    motivation;
}
__decorate([
    Transform(({ value }) => typeof value === 'string' ? value.trim() : value),
    IsString(),
    MinLength(2),
    MaxLength(120),
    __metadata("design:type", String)
], CreateParticipationDto.prototype, "fullName", void 0);
__decorate([
    Transform(({ value }) => typeof value === 'string'
        ? value.trim().toLowerCase()
        : value),
    IsEmail(),
    MaxLength(254),
    __metadata("design:type", String)
], CreateParticipationDto.prototype, "email", void 0);
__decorate([
    Transform(({ value }) => typeof value === 'string'
        ? value.trim() || undefined
        : value),
    IsOptional(),
    IsString(),
    MaxLength(25),
    Matches(/^\+?[0-9\s().-]+$/),
    __metadata("design:type", String)
], CreateParticipationDto.prototype, "phone", void 0);
__decorate([
    Transform(({ value }) => typeof value === 'string' ? value.trim() : value),
    IsString(),
    MinLength(2),
    MaxLength(100),
    __metadata("design:type", String)
], CreateParticipationDto.prototype, "province", void 0);
__decorate([
    Transform(({ value }) => typeof value === 'string' ? value.trim() : value),
    IsString(),
    MinLength(20),
    MaxLength(1500),
    __metadata("design:type", String)
], CreateParticipationDto.prototype, "motivation", void 0);
//# sourceMappingURL=create-participation.dto.js.map