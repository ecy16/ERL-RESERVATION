"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationDocumentsModule = void 0;
const common_1 = require("@nestjs/common");
const reservation_documents_controller_1 = require("./reservation-documents.controller");
const reservation_documents_service_1 = require("./reservation-documents.service");
let ReservationDocumentsModule = class ReservationDocumentsModule {
};
exports.ReservationDocumentsModule = ReservationDocumentsModule;
exports.ReservationDocumentsModule = ReservationDocumentsModule = __decorate([
    (0, common_1.Module)({
        controllers: [reservation_documents_controller_1.ReservationDocumentsController],
        providers: [reservation_documents_service_1.ReservationDocumentsService]
    })
], ReservationDocumentsModule);
//# sourceMappingURL=reservation-documents.module.js.map