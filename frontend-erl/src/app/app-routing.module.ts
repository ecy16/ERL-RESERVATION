import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { VehiclesComponent } from "./MasterScreen/vehicles/vehicles.component";
import { VehicleDetailsComponent } from "./MasterScreen/vehicle-details/vehicle-details.component";
import { VehicleDocumentsComponent } from "./MasterScreen/vehicle-documents/vehicle-documents.component";
import { UsersManagementComponent } from "./AdminSettings/users-management/users-management.component";
import { BookingScreenComponent } from "./Booking/booking-screen/booking-screen.component";
import { BookingDetailsComponent } from "./Booking/booking-details/booking-details.component";
import { IncidentsComponent } from "./Booking/incidents/incidents.component";
import { AssignmentComponent } from "./Booking/assignment/assignment.component";
import { ChaufferComponent } from "./chauffer/chauffer.component";
import { DriversComponent } from "./MasterScreen/drivers/drivers.component";
import { ContractsComponent } from "./contracts/contracts.component";
import { ContractInformationComponent } from "./contract-information/contract-information.component";
import { LoginComponent } from "./login/login.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { BillingComponent } from "./billing/billing.component";
import { BillingDetailsComponent } from "./billing-details/billing-details.component";
import { RosterComponent } from "./roster/roster.component";
import { DeliveryComponent } from "./delivery/delivery.component";
import { ScheduledTripsComponent } from "./scheduled-trips/scheduled-trips.component";

const routes: Routes = [
  // {path:"",component:LoginComponent},

  { path: "vehicles", component: VehiclesComponent },
  { path: "drivers", component: DriversComponent },
  { path: "vehicleDetails", component: VehicleDetailsComponent },
  { path: "vehicleDocuments", component: VehicleDocumentsComponent },
  { path: "AdminSettings", component: UsersManagementComponent },
  { path: "Booking", component: BookingScreenComponent },
  { path: "BookingDetails/:ReservationId", component: BookingDetailsComponent },
  { path: "Incidents", component: IncidentsComponent },
  { path: "Assignment", component: AssignmentComponent },
  { path: "Chauffer",component:ChaufferComponent },
  {path:"Contracts",component:ContractsComponent},
  {path:"login",component:LoginComponent},
  {path:"forgotPassword",component:ForgotPasswordComponent},
  {path:"BookingDetails",component:BookingDetailsComponent},
  {path:"Billing",component:BillingComponent},
  {path:"BillingDetails/:ReservationId",component:BillingDetailsComponent},
  { path: 'BillingDetails/:id', component: BillingDetailsComponent },
  {path:"Roster",component:RosterComponent},
  {path:"contract-details/related/:ContractId",component:ContractInformationComponent},
  {path:"delivery/:TripId",component:DeliveryComponent},
{path:"scheduledTrips",component:ScheduledTripsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
