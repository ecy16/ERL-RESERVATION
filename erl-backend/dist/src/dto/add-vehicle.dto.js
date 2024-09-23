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
exports.AddVehicleDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class AddVehicleDto {
}
exports.AddVehicleDto = AddVehicleDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'reg-101', description: 'vehicle registration number' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AddVehicleDto.prototype, "vehicleRegNo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'sample vehicle description', description: 'Vehicle description' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AddVehicleDto.prototype, "vehicleDescription", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-09-23', description: 'vehicle commission date' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AddVehicleDto.prototype, "commissionDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'John Doe', description: 'Vehicle owner' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AddVehicleDto.prototype, "vehicleOwner", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'chassis101', description: 'Chassis number' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddVehicleDto.prototype, "chassisNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'new', description: 'Vehicle status' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddVehicleDto.prototype, "vehicleStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Toyota', description: 'Vehicle make' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddVehicleDto.prototype, "vehicleMake", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Prado', description: 'Vehicle model' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddVehicleDto.prototype, "vehicleModel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'black', description: 'Vehicle color' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddVehicleDto.prototype, "vehicleColor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2000', description: 'Engine capacity' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddVehicleDto.prototype, "engineCapacity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'suv', description: 'vehicle type' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddVehicleDto.prototype, "vehicleType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'automatic', description: 'Vehicle transmission' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddVehicleDto.prototype, "vehicleTransmission", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-09-23', description: 'Inspection due date' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddVehicleDto.prototype, "inspectionDueDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-09-23', description: 'Insurance due date' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddVehicleDto.prototype, "insuranceDueDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-09-23', description: 'psv due date' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddVehicleDto.prototype, "psvDueDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'sample text', description: 'remarks' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddVehicleDto.prototype, "remarks", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'last service done', description: 'last service done' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddVehicleDto.prototype, "lastServiceDone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 100, description: 'last odometer reading' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], AddVehicleDto.prototype, "lastOdometerReading", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Jane doe', description: 'created by' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddVehicleDto.prototype, "CreatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-06-23', description: 'Created on' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddVehicleDto.prototype, "CreatedOn", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', format: 'binary', description: 'Image file' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], AddVehicleDto.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', format: 'binary', description: 'Document file (PDF or TXT)' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], AddVehicleDto.prototype, "document", void 0);
//# sourceMappingURL=add-vehicle.dto.js.map