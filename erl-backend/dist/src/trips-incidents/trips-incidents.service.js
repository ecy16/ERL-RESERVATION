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
exports.TripsIncidentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const tripIncidents_entity_1 = require("../entities/tripIncidents.entity");
const typeorm_2 = require("typeorm");
let TripsIncidentsService = class TripsIncidentsService {
    constructor(tripincidentsRepo, tripincidentsEntity, tripIncidentDataSource) {
        this.tripincidentsRepo = tripincidentsRepo;
        this.tripincidentsEntity = tripincidentsEntity;
        this.tripIncidentDataSource = tripIncidentDataSource;
    }
    async createTripIncident(addTripsIncidentsDto) {
        const tripIncidents = new tripIncidents_entity_1.TripIncidentsEntity(addTripsIncidentsDto);
        try {
            return await this.tripincidentsEntity.save(tripIncidents);
        }
        catch (e) {
            throw new common_1.BadRequestException(e);
        }
    }
    async findAllTripIncidents() {
        try {
            return await this.tripincidentsRepo.find();
        }
        catch (err) {
            throw new common_1.BadRequestException(err);
        }
    }
    findTripIncident(id) {
        return this.tripincidentsRepo.findOne({
            where: { TripIncidentId: id },
        });
    }
    async updateTripIncident(id, attrs) {
        const incidents = await this.findTripIncident(id);
        if (!incidents) {
            throw new common_1.NotFoundException('services not found');
        }
        Object.assign(incidents, attrs);
        return this.tripincidentsRepo.save(incidents);
    }
    async fetchIncidentTypes() {
        const incidentType = await this.tripIncidentDataSource.createQueryRunner();
        await incidentType.connect();
        try {
            await incidentType.startTransaction();
            const incident = await incidentType.manager.query(`select  distinct category_Options from _cplItemMaster where item_Name=@0 and category_name=@1 `, ['TripIncidents', 'Type']);
            await incidentType.commitTransaction();
            return incident;
        }
        catch (e) {
            throw new common_1.BadRequestException(e.message);
        }
    }
    async findRelatedTripsIncident(reservationId) {
        const incident = this.tripIncidentDataSource.createQueryRunner();
        await incident.connect();
        try {
            await incident.startTransaction();
            const incidentInfo = await incident.query(`select  * from _cplTripIncidents where ReservationId=@0`, [reservationId]);
            await incident.commitTransaction();
            return incidentInfo;
        }
        catch (e) {
            throw new Error(`Failed to find trips: ${e.message}`);
        }
    }
};
exports.TripsIncidentsService = TripsIncidentsService;
exports.TripsIncidentsService = TripsIncidentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tripIncidents_entity_1.TripIncidentsEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.EntityManager,
        typeorm_2.DataSource])
], TripsIncidentsService);
//# sourceMappingURL=trips-incidents.service.js.map