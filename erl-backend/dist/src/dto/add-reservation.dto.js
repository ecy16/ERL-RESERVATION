"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddReservationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class AddReservationDto {
}
exports.AddReservationDto = AddReservationDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AddReservationDto.prototype, "BookingNo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2024-09-12',
        description: 'The date of the reservation'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AddReservationDto.prototype, "BookingDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The category of the booking',
        example: 'self driven'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AddReservationDto.prototype, "BookingCategory", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'This is the booking type',
        example: 'Complimentary'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AddReservationDto.prototype, "BookingType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'JKIA', description: 'This is the booking branch' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AddReservationDto.prototype, "Branch", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'InProgress', description: 'The status of the booking' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddReservationDto.prototype, "BookingStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'John Doe', description: 'The target client' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AddReservationDto.prototype, "BookingFor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'KQ1234', description: 'This is the company code' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AddReservationDto.prototype, "CompanyCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Safaricom', description: 'This is the payee company name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AddReservationDto.prototype, "PayeeCompanyName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Sample remarks text', description: 'Remarks about the reservation' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AddReservationDto.prototype, "Remarks", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Jane Doe', description: 'Reservation creator' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AddReservationDto.prototype, "Source", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Ref001', description: 'Source reference' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AddReservationDto.prototype, "SourceRefNo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'Contract is' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], AddReservationDto.prototype, "ContractId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AddReservationDto.prototype, "CreditCardPreAuthStatus", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AddReservationDto.prototype, "CreatedBy", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AddReservationDto.prototype, "CreatedOn", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AddReservationDto.prototype, "TotalAmount", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AddReservationDto.prototype, "TotalPaid", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AddReservationDto.prototype, "ExchangeRate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AddReservationDto.prototype, "companyName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AddReservationDto.prototype, "ContractNo", void 0);
//# sourceMappingURL=add-reservation.dto.js.map