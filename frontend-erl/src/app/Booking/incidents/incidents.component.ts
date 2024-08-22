import { CommonModule, NgFor } from "@angular/common";
import { Component, TemplateRef, inject } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import {
  NgbDatepickerModule,
  NgbAlertModule,
  NgbModal,
  NgbAccordionModule,
} from "@ng-bootstrap/ng-bootstrap";
import { ApiService } from "../../api.services";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute } from "@angular/router";

@Component({
  standalone: true,
  selector: "app-incidents",
  templateUrl: "./incidents.component.html",
  styleUrls: ["./incidents.component.css"],
  imports: [
    MatTableModule,
    CommonModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule,
    NgFor,
    NgbDatepickerModule,
    NgbAlertModule,
    NgbAccordionModule,
  ],
})
export class IncidentsComponent {
  private modalService = inject(NgbModal);
  closeResult = "";
  vehicleModelList: any;
  tripIncidentsForm: FormGroup;
  tripIncidentsUpdateForm: FormGroup;
  rentalAgreementForm:FormGroup;
  mileageForm: FormGroup;
  mileageUpdateForm: FormGroup;
  incidentDate: any;
  tripIncidentsData: any;
  tripList: any;
  tripFuelLevel: any;
  tripStatusList: any;
  reservationId: any;
  tripIncidentData: any;
  tripIncidentsTypeList: any;
  tripIncidentsList: any;
  getDismissReason: any;
  Mileages: any;
  MileageData: any;
  incidentData: any;
  fetchedTripList: any;
  vehicleMakeList: any;
  vehicleTypeList: any;
  vehicleRegistrationList: any;
  driverServiceStatusList: any;
  rentalAgreement: any;
  rentalAgreementList: any;
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private toastr: ToastrService,
    private actRoute: ActivatedRoute
  ) {
    this.fetchedTripList = [];
    this.tripIncidentsList = [];
    this.tripFuelLevel = [];
    this.tripIncidentData = [];
    this.MileageData = [];
    this.incidentData = [];
    this.vehicleRegistrationList = []
    this.vehicleModelList = [];
    this.driverServiceStatusList =[]
    this.vehicleTypeList = [];
    this.vehicleMakeList = [];
    this.rentalAgreementList=[];
    this.tripIncidentsForm = this.formBuilder.group({
      IncidentType: [""],
      IncidentRemarks: [""],
      ReportedBy: [""],
      DriverName: [""],
      TripId: "",
      IncidentDateTime: [""],
      Disposition: [""],
    });
    this.tripIncidentsUpdateForm = this.formBuilder.group({
      IncidentType: [""],
      IncidentRemarks: [""],
      ReportedBy: [""],
      DriverName: [""],
      TripId: "",
      IncidentDateTime: [""],
      Disposition: [""],
    });
    this.rentalAgreementForm=this.formBuilder.group({

    })
    this.mileageForm = this.formBuilder.group({
      FuelIN: [""],
      FuelOUT: [""],
      MileageOUT: [""],
      MileageIN: [""],
    });
    this.mileageUpdateForm = this.formBuilder.group({
      FuelIN: [""],
      FuelOUT: [""],
      MileageOUT: [""],
      MileageIN: [""],
    });

    this.tripIncidentsForm.patchValue({
      ReservationId: this.actRoute.snapshot.params["ReservationId"],
    });
  }
  ngOnInit() {
    this.apiService.getIncidentsType().subscribe((Incident) => {
      for (const h of Incident) {
        this.tripIncidentsTypeList.push(h);
      }
      // console.log("NNNNNNN", Incident);
    });

    this.apiService.getFuelLevel().subscribe((fuelLevel) => {
      for (const b of fuelLevel) {
        this.tripFuelLevel.push(b);
      }
    });

    // this.apiService
    //   .getRelatedTripIncidents(this.reservationId, TripId)
    //   .subscribe((tripIncident) => {
    //     for (const y of tripIncident) {
    //       this.tripIncidentsList.push(y);
    //     }
    //     console.log(this.tripIncidentsList);
    //   });
    // this.apiService;

    this.apiService.getReservations().subscribe((reservations: any[]) => {
      this.incidentData = reservations;
      this.incidentData.push(reservations);
    });
    console.log("Bookings:");

    this.apiService
      .getRelatedTrip(this.reservationId)
      .subscribe((tripNumbers: any) => {
        for (const a of tripNumbers) {
          this.tripIncidentData.push(a);
        }
      });

  }

  fetchModels(VehicleMake: any) {
    // console.log(vehicleMake, "vehiclemake");

    // this.apiService.getVehicleModel(vehicleMake)
    this.apiService.getVehicleModel(VehicleMake).subscribe((VehicleModel) => {
      this.vehicleModelList = [];
      for (const g of VehicleModel) {
        this.vehicleModelList.push(g);
      }
      console.log(VehicleMake, "eric");
    });
  }


  fetchVehicleModels(VehicleMake: any) {
    // console.log(vehicleMake, "vehiclemake");

    // this.apiService.getVehicleModel(vehicleMake)
    this.apiService.getVehicleModel(VehicleMake).subscribe((VehicleModel) => {
      this.vehicleModelList = [];
      for (const g of VehicleModel) {
        this.vehicleModelList.push(g);
      }
      console.log(VehicleMake, "MAKE:");
    });
  }
  saveTripIncidents() {
    JSON.stringify(this.tripIncidentsForm.value);
    this.tripIncidentsData = [];
    this.apiService
      .addTripIncident(this.tripIncidentsForm.value)
      .subscribe(() => {
        this.tripIncidentsData.push(this.tripIncidentsForm.value);
      });
    console.log("trip incidents", this.tripIncidentsForm.value);
  }
  fetchRelatedTripIncidents(reservationId: any, TripId: any) {
    this.tripIncidentsList = [];
    this.apiService
      .getRelatedTripIncidents(reservationId, TripId)
      .subscribe((tripIncident) => {
        for (const y of tripIncident) {
          this.tripIncidentsList.push(y);
        }
        // console.log(this.tripIncidentsList);
      });
  }
  EditTripIncidents() { }

  viewTripIncidents(incidents: any) {
    this.modalService
      .open(incidents, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  openEditIncident(incidentEdit: any) {
    this.modalService.open(incidentEdit, { size: "md" }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  addMileage() {
    JSON.stringify(this.mileageForm.value);
    this.MileageData = [];
    this.apiService.addTrip(this.mileageForm.value).subscribe(() => {
      this.MileageData.push(this.mileageForm.value);
    });

    console.log("Mileage", this.MileageData);
  }

  openVehicleMileage(Mileageview: any) {
    this.modalService.open(Mileageview, { size: "md" }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  getRelatedTrips(ReservationId: any) {
    this.tripIncidentData = [];
    this.apiService
      .getRelatedTrip(ReservationId)
      .subscribe((tripNumbers: any) => {
        for (const a of tripNumbers) {
          this.tripIncidentData.push(a);
        }
      });
    console.log(this.tripIncidentData);
  }


  fetchTrip(TripId: any) {
    // loading data on a modal for edit
    console.log(TripId, "tripidfd");
    // this.fetchedTripList = [];

    this.apiService.getTripById(TripId).subscribe((relatedTrip) => {
      for (const y of relatedTrip) {
        this.fetchedTripList.push(y);

        console.log(relatedTrip);
      }
      for (const d of this.fetchedTripList) {
        this.tripIncidentsForm.patchValue({
          DriverServiceStatus: d.DriverServiceStatus,
          TripStatus: d.TripStatus,
          VehicleMarks: d.VehicleMarks,
          FromDateTime: d.FromDateTime,
          ToDateTime: d.ToDateTime,
          FlightNo: d.FlightNo,
          FlightDate: d.FlightDate,
          Airline: d.Airline,
          PickupAddress: d.PickupAddress,
          PickupContact: d.PickupContact,
          PickupEmail: d.PickupEmail,
          DropAddress: d.DropAddress,
          MileageIN: d.MileageIN,
          tripFuelLevel: d.tripFuelLevel,
          MileageOUT: d.MileageOUT,
          FuelIN: d.FuelIN,
          FuelOUT: d.FuelOUT,
          ReservationId: d.ReservationId,
          tripNumber: d.tripNumber,
          TripId: d.TripId,
          VehicleMake: d.VehicleMake,
          VehicleModel: d.VehicleModel,
          vehicleRegistration: d.vehicleRegistration,
          vehicleType: d.vehicleType,
          TripNo: d.TripNo,
        });

        // this.tripFormUpdate.push(relatedTrip)
        console.log(d, "kgggygyug");
        console.log(this.fetchedTripList, "yfigf");
      }
    });
    console.log(this.fetchedTripList, ".....................");
  }

  printForm() {
    
    const printableContent = this.rentalAgreement.nativeElement.innerHTML;
    const originalContent = document.body.innerHTML;
    document.body.innerHTML = printableContent;
    window.print();
    document.body.innerHTML = originalContent;
 console.log('printable',printableContent)
  }


  fetchRentalAgreement(reservationId: any) {
    this.apiService.getDocuments(reservationId).subscribe((documents) => {
      this.rentalAgreementList = [];
      for (const ww of documents) {
        this.rentalAgreementList.push(ww)
      }
      for (const w of this.rentalAgreementList) {
        this.rentalAgreementForm.patchValue({
          DriverFirstName: w.username,
          DriverLastName: w.username,
          ContactNo: w.ContactNo,
          Email: w.Email,
          AddressLine1: w.AddressLine1,
          DriverLicenseNo: w.DriverLicenseNo,
          DriverLicenseIssue: w.DriverLicenseIssue,
          DriverLicenseExpiry: w.DriverLicenseExpiry,
          CountryOfResidence: w.CountryOfResidence,
          DriverDOB: w.DriverDOB,
          IDPP: w.IDPP,
          CountryOfIssue: w.CountryOfIssue,
          PickupAddress: w.PickupAddress,
          BookingNo: w.BookingNo,
          vehicleRegNo: w.vehicleRegNo,
          VehicleModel: w.VehicleModel,
          FromDateTime: w.FromDateTime,
          DropAddress: w.DropAddress,
          ToDateTime: w.ToDateTime,
        })

      }

      console.log(this.rentalAgreementList, 'w')
    })
  }

  view(rentalAgreement: TemplateRef<any>) {
    this.modalService.open(rentalAgreement, { size: "lg" }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }


  
}
