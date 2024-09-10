"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const vehicles_module_1 = require("./vehicles/vehicles.module");
const reservations_module_1 = require("./reservations/reservations.module");
const typeorm_1 = require("@nestjs/typeorm");
const users_module_1 = require("./users/users.module");
const trips_module_1 = require("./trips/trips.module");
const config_1 = require("@nestjs/config");
const typeorm_config_1 = require("../config/typeorm.config");
const trips_incidents_module_1 = require("./trips-incidents/trips-incidents.module");
const trips_services_module_1 = require("./trips-services/trips-services.module");
const self_drivers_module_1 = require("./self-drivers/self-drivers.module");
const clients_module_1 = require("./clients/clients.module");
const vehicle_master_module_1 = require("./vehicle-master/vehicle-master.module");
const doc_attachments_module_1 = require("./doc-attachments/doc-attachments.module");
const reservation_documents_module_1 = require("./reservation-documents/reservation-documents.module");
const chauffer_drivers_module_1 = require("./chauffer-drivers/chauffer-drivers.module");
const contracts_module_1 = require("./contracts/contracts.module");
const contract_details_module_1 = require("./contract-details/contract-details.module");
const charges_module_1 = require("./charges/charges.module");
const login_module_1 = require("./login/login.module");
const auth_module_1 = require("./auth/auth.module");
const forgot_password_module_1 = require("./forgot-password/forgot-password.module");
const mail_service_1 = require("./mail/mail.service");
const billing_module_1 = require("./billing/billing.module");
const photos_module_1 = require("./photos/photos.module");
const countries_module_1 = require("./countries/countries.module");
const transactions_module_1 = require("./transactions/transactions.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            vehicles_module_1.VehiclesModule,
            reservations_module_1.ReservationsModule,
            typeorm_1.TypeOrmModule.forRootAsync(typeorm_config_1.typeOrmConfigAsync),
            users_module_1.UsersModule,
            trips_module_1.TripsModule,
            trips_incidents_module_1.TripsIncidentsModule,
            trips_services_module_1.TripsServicesModule,
            config_1.ConfigModule.forRoot({
                envFilePath: '.env.local',
            }),
            self_drivers_module_1.SelfDriversModule,
            contracts_module_1.ContractsModule,
            clients_module_1.ClientsModule,
            vehicle_master_module_1.VehicleMasterModule,
            doc_attachments_module_1.DocAttachmentsModule,
            reservation_documents_module_1.ReservationDocumentsModule,
            chauffer_drivers_module_1.ChaufferDriversModule,
            contract_details_module_1.ContractDetailsModule,
            charges_module_1.ChargesModule,
            login_module_1.LoginModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            forgot_password_module_1.ForgotPasswordModule,
            billing_module_1.BillingModule,
            photos_module_1.PhotosModule,
            countries_module_1.CountriesModule,
            transactions_module_1.TransactionsModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, mail_service_1.MailService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map