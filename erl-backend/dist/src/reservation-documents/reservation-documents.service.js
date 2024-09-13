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
exports.ReservationDocumentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let ReservationDocumentsService = class ReservationDocumentsService {
    constructor(documentsDataSource) {
        this.documentsDataSource = documentsDataSource;
    }
    async fetchRentalAgreement(reservationId) {
        const Agreement = await this.documentsDataSource.createQueryRunner();
        Agreement.connect();
        try {
            await Agreement.startTransaction();
            const RentalAgreement = await Agreement.manager.query(`select distinct d.DriverFirstName + ' '+d.DriverLastName as username,a.Branch,a.BookingNo ,d.ContactNo ,d.Email, 
        d.AddressLine1 +' '+d.AddressLine2 +' ' +d.AddressLine3 as 'address',d.DriverDOB,d.IDPP,d.CountryOfIssue,
        d.DriverLicenseNo,d.DriverLicenseIssue,d.DriverLicenseExpiry,e.VehicleModel,e.vehicleRegNo from _cplReservations a 
        join _cplReservationTrips b on a.ReservationId = b.ReservationId  join _cplTripServices c on b.ReservationId = c.ReservationId 
        join _cplSelfDrivers d on c.ReservationId=d.ReservationId left join _cplVehicles e on b.VehicleId=e.vehicleID where a.ReservationId=@0`, [reservationId]);
            await Agreement.commitTransaction();
            return RentalAgreement;
        }
        catch (e) {
            throw new common_1.BadRequestException(e.message);
        }
    }
};
exports.ReservationDocumentsService = ReservationDocumentsService;
exports.ReservationDocumentsService = ReservationDocumentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], ReservationDocumentsService);
//# sourceMappingURL=reservation-documents.service.js.map