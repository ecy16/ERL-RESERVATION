import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VehiclesModule } from './vehicles/vehicles.module';
import { ReservationsModule } from './reservations/reservations.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { TripsModule } from './trips/trips.module';
import { ConfigModule } from '@nestjs/config';
import { typeOrmConfigAsync } from '../config/typeorm.config';
import { TripsIncidentsModule } from './trips-incidents/trips-incidents.module';
import { TripsServicesModule } from './trips-services/trips-services.module';
import { SelfDriversModule } from './self-drivers/self-drivers.module';
import { ClientsModule } from './clients/clients.module';
import { VehicleMasterModule } from './vehicle-master/vehicle-master.module';
import { DocAttachmentsModule } from './doc-attachments/doc-attachments.module';
import { ReservationDocumentsModule } from './reservation-documents/reservation-documents.module';
import { ChaufferDriversModule } from './chauffer-drivers/chauffer-drivers.module';
import { ContractsModule } from './contracts/contracts.module';
import { ContractDetailsModule } from './contract-details/contract-details.module';
import { ChargesModule } from './charges/charges.module';
import { LoginModule } from './login/login.module';
import { AuthModule } from './auth/auth.module'
import { ForgotPasswordModule } from './forgot-password/forgot-password.module';
import { MailService } from './mail/mail.service';
import { BillingModule } from './billing/billing.module';
import { PhotosModule } from './photos/photos.module';
import { PhotosService } from './photos/photos.service';
import { AccessControlModule } from 'nest-access-control';
// import { roles } from './user.roles';
import { Role } from './role.enum';
import { RolesGuard } from './auth/guards/roles.guard';
import { FileUploadService } from './FileUpload.service';
import { CountriesModule } from './countries/countries.module';

@Module({
    imports: [
        VehiclesModule,
        ReservationsModule,
        TypeOrmModule.forRootAsync(typeOrmConfigAsync),
        UsersModule,
        TripsModule,
        TripsIncidentsModule,
        TripsServicesModule,
        ConfigModule.forRoot({
            envFilePath: '.env.local',
        }),
        SelfDriversModule,
        ContractsModule,
        ClientsModule,
        VehicleMasterModule,
        DocAttachmentsModule,
        ReservationDocumentsModule,
        ChaufferDriversModule,
        ContractDetailsModule,
        ChargesModule,
        LoginModule,
        AuthModule,
        UsersModule,
        ForgotPasswordModule,
        BillingModule,
        PhotosModule,
        CountriesModule
        // AccessControlModule.forRoles(Role)
    ],
    controllers: [AppController],
    providers: [AppService, MailService] ,
})
export class AppModule { }
