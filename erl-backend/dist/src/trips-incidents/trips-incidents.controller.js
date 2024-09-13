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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripsIncidentsController = void 0;
const common_1 = require("@nestjs/common");
const trips_incidents_service_1 = require("./trips-incidents.service");
const add_tripIncidents_dto_1 = require("../dto/add-tripIncidents.dto");
const update_tripIncidents_dto_1 = require("../dto/update-tripIncidents.dto");
let TripsIncidentsController = class TripsIncidentsController {
    constructor(tripsIncidentsService) {
        this.tripsIncidentsService = tripsIncidentsService;
    }
    fetchTripIncident(id) {
        return this.tripsIncidentsService.findTripIncident(parseInt(id));
    }
    fetchAllTripIncidents() {
        return this.tripsIncidentsService.findAllTripIncidents();
    }
    addNewTripIncident(body) {
        return this.tripsIncidentsService.createTripIncident(body);
    }
    updateTripIncident(id, body) {
        return this.tripsIncidentsService.updateTripIncident(parseInt(id), body);
    }
    fetchServiceStatus() {
        return this.tripsIncidentsService.fetchIncidentTypes();
    }
    fetchRelatedServices(reservationId) {
        return this.tripsIncidentsService.findRelatedTripsIncident(parseInt(reservationId));
    }
};
exports.TripsIncidentsController = TripsIncidentsController;
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TripsIncidentsController.prototype, "fetchTripIncident", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TripsIncidentsController.prototype, "fetchAllTripIncidents", null);
__decorate([
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_tripIncidents_dto_1.AddTripIncidentsDto]),
    __metadata("design:returntype", void 0)
], TripsIncidentsController.prototype, "addNewTripIncident", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_tripIncidents_dto_1.UpdateTripIncidentsDto]),
    __metadata("design:returntype", void 0)
], TripsIncidentsController.prototype, "updateTripIncident", null);
__decorate([
    (0, common_1.Post)('types'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TripsIncidentsController.prototype, "fetchServiceStatus", null);
__decorate([
    (0, common_1.Get)('incident/:reservationId'),
    __param(0, (0, common_1.Param)('reservationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TripsIncidentsController.prototype, "fetchRelatedServices", null);
exports.TripsIncidentsController = TripsIncidentsController = __decorate([
    (0, common_1.Controller)('trips-incidents'),
    __metadata("design:paramtypes", [trips_incidents_service_1.TripsIncidentsService])
], TripsIncidentsController);
//# sourceMappingURL=trips-incidents.controller.js.map