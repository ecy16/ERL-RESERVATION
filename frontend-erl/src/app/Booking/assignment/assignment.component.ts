import { Component, inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { NgbAccordionModule, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/api.services";
import { CommonModule, NgFor } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import * as moment from "moment";
import { DataTablesModule } from "angular-datatables";
import { Router } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";


import { jsPDF } from "jspdf";

export interface Reservation {
  BookingNo: string;
  BookingDate: string;
  BookingCategory: string;
  BookingType: string;
  Branch: string;
  BookingStatus: string;
  Source: string;
  BookingFor: string;
  CreatedOn: string;
  ReservationId: number;
}

@Component({
  standalone: true,
  selector: "app-assignment",
  templateUrl: "./assignment.component.html",
  styleUrls: ["./assignment.component.css"],
  imports: [
    NgbAccordionModule,
    CommonModule,
    NgFor,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    RouterModule,
    MatIconModule
  ],
})
export class AssignmentComponent {
  trip: any;
  fetchedTripList: any;
  fetchedCDOData: any;
  tripFormUpdate: any;
  private modalService = inject(NgbModal);
  closeResult = "";
  assignmentData: any;
  AssignmentSearchForm: FormGroup;
  reservationId: any;
  tripList: any;
  tripAssignmentData: any;
  getDismissReason: any;
  tripAssignmentForm: any;
  tripNumber: any;
  filteredReservations: any[] = [];

  vehicleRegistrationList: any;
  chaufferDriversList: any;
  vehicleModelList: any;
  vehicleMakeList: any;
  vehicleTypeList: any;
  driverServiceStatusList: any;
  tripStatusList: any;
  tripFuelLevel: any;
  TripStatus: any;
  tripAssignmentList: any;
  BookingCategory: any;
  BookingData: any;
  fetchedVehicleList: any;
  DriversNameList: any;
  fetchedDriversNameList: any;
  assignmentAllTrips: any;
  dtOptions: DataTables.Settings = {};
  rentalAgreement: any;
  vehicleAssignedError: any;
  driverAssignedError: any;
  bookingStatusData: any;
  bookingCategoriesData: any;
  bookingBranchData: any;



  filteredAssignment: any[] = [];
  formGroup: any;

  toggle(arg0: string) {
    throw new Error("Method not implemented.");
  }
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private toastr: ToastrService,
    private actRoute: ActivatedRoute,
    private router: Router
  ) {
    this.assignmentData = [];
    this.assignmentAllTrips = [];
    this.tripAssignmentData = [];
    this.fetchedTripList = [];
    this.fetchedCDOData = [];

    this.tripStatusList = [];
    this.vehicleRegistrationList = [];
    this.chaufferDriversList = [];
    this.vehicleMakeList = [];
    this.vehicleModelList = [];
    this.driverServiceStatusList = [];
    this.fetchedVehicleList = [];
    this.DriversNameList = [];
    this.fetchedDriversNameList = [];
    this.bookingStatusData = [];
    this.bookingCategoriesData = [];
    this.bookingBranchData = [];



    this.tripAssignmentList = [];
    this.tripAssignmentForm = this.formBuilder.group({
      DriverServiceStatus: "",
      TripNo: "",
      TripStatus: "",
      VehicleMarks: "",
      FromDateTime: "",
      ToDateTime: "",
      FlightNo: "",
      FlightDate: "",
      Airline: "",
      PickupAddress: "",
      PickupContactNo: "",
      PickupName: "",
      PickupEmail: "",
      DropAddress: "",
      MileageIN: "",
      tripFuelLevel: "",
      MileageOUT: "",
      FuelIN: "",
      FuelOUT: "",
      ReservationId: "",
      BookingNo: "",
      // tripNumber: "",
      TripId: "",
      VehicleMake: "",
      VehicleModel: "",
      vehicleRegNo: "",
      vehicleType: "",
      vehicleID: "",
      DriverId: "",
      DriverFirstName: "",
      BookingCategory: "",
      BookingFor: "",
    });

    this.AssignmentSearchForm = this.formBuilder.group({
      BookingNo: ["", Validators.required],
      BookingDate: ["", Validators.required],
      BookingCategory: ["", Validators.required],
      FromDateTime: ["", Validators.required],
      ToDateTime: ["", Validators.required],
      BookingStatus: ["InProgress", Validators.required],
      BookingType: ["", Validators.required],
      Branch: ["", Validators.required],
      vehicleMake: ["", Validators.required],
      vehicleID: ["", Validators.required],
    });

    this.tripFormUpdate = this.formBuilder.group({
      DriverServiceStatus: "",
      TripNo: "",
      TripStatus: "",
      VehicleMarks: "",
      FromDateTime: "",
      ToDateTime: "",
      FlightNo: "",
      // FlightDateTime: "",
      Airline: "",
      PickupAddress: "",
      PickupContactNo: "",
      PickupEmail: "",
      DropAddress: "",
      // MileageIN: "",
      // tripFuelLevel: "",
      MileageOUT: "",
      // FuelIN: "",
      FuelOUT: "",
      ReservationId: "",
      //  tripNumber: "",
      TripId: "",
      VehicleMake: "",
      VehicleModel: "",
      vehicleRegNo: "",
      vehicleType: "",
      BookingCategory: "",
      vehicleID: ""
    });
  }

  ngOnInit() {
    this.apiService.getReservations().subscribe((reservations: any[]) => {
      this.filteredReservations = reservations.filter(
        (reservation) => reservation.BookingStatus === "InProgress"
      );
      console.log("Filtered reservations:", this.filteredReservations);
      this.assignmentData = [...this.filteredReservations];
    });

    //   this.filteredReservations = data.filter(reservation => {
    //     return reservation.BookingStatus === 'InProgress';
    //   });
    //   console.log('rrrrrrrrrreservations for todat', this.filteredReservations)
    //   this.reservationData = [...this.filteredReservations];

    //   this.reservationData = []
    //   this.reservationData.push(this.filteredReservations);
    // }

    this.assignmentData = [];
    this.assignmentData.push(this.filteredAssignment);


    console.log("Bookings:");

    // this.apiService
    //   .fetchAllTrips()
    //   .subscribe((tripNumbers: any) => {
    //     for (const a of tripNumbers) {
    //       this.tripAssignmentData.push(a);
    //     }
    //   });
    this.getallTrips();
    this.dtOptions = {
      order: [[4, "desc"]],
    };
    this.apiService.getBookingStatus().subscribe((status: any) => {
      for (const d of status) {
        this.bookingStatusData.push(d);
      }
    });
    this.apiService.getBookingCategories().subscribe((categories: any) => {
      for (const a of categories) {
        this.bookingCategoriesData.push(a);
      }
      console.log('categories', categories)
    });
    // this.fetchTrip(this.reservationId)
    // console.log(this.tripList,'.....................')

    this.apiService.getTripStatus().subscribe((tripStatus) => {
      for (const d of tripStatus) {
        this.tripStatusList.push(d);
      }
    });

    this.apiService.fetchAllChauffers().subscribe((DriverFirstName) => {
      for (const u of DriverFirstName) {
        this.DriversNameList.push(u);
      }
    });
    this.apiService.getAllVehicles().subscribe((res) => {
      for (const u of res) {
        this.fetchedVehicleList.push(u);
      }
    });

    this.apiService.getVehicleRegistration().subscribe((vehicleReg) => {
      for (const f of vehicleReg) {
        this.vehicleRegistrationList.push(f);
      }
    });
    this.apiService.getAllChauffers().subscribe((response) => {
      for (const c of response) {
        this.chaufferDriversList.push(c);
      }
      console.log(response, "getchauffer");
    });
    this.apiService.getBookingBranch().subscribe((branch: any) => {
      for (const f of branch) {
        this.bookingBranchData.push(f);
      }
    });
    this.apiService.getFuelLevel().subscribe((fuelLevel) => {
      for (const b of fuelLevel) {
        this.tripFuelLevel.push(b);
      }
      // console.log(this.tripFuelLevel, ".....................");
    });
    this.apiService.getVehicleMake().subscribe((VehicleMake) => {
      for (const j of VehicleMake) {
        this.vehicleMakeList.push(j);
      }
      // console.log(vehicleMake, "vvvvvvv");
    });

    this.apiService
      .getDriverServiceStatus()
      .subscribe((driverServiceStatus) => {
        for (const c of driverServiceStatus) {
          this.driverServiceStatusList.push(c);
        }
        // console.log(this.driverServiceStatusList, ".....................");
      });

    const BookingDateSX = moment(new Date()).format("YYYY-MM-DD");

    this.AssignmentSearchForm.patchValue({
      fromDate: BookingDateSX,
      toDate: BookingDateSX,
      BookingStatus: "InProgress",
    });

  }
  searching() { }

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

  fetchingAllChauffers() {
    this.apiService.getAllChauffers().subscribe((DriverFirstName) => {
      this.DriversNameList = [];
      for (const m of DriverFirstName) {
        this.DriversNameList.push(m);
      }
      console.log(DriverFirstName, "DriverFirstName");
    });
  }
  resourceSearching() {
    const formValues = this.AssignmentSearchForm.value;

    if (formValues.FromDateTime) {
      formValues.FromDateTime = new Date(formValues.FromDateTime).toISOString();
    }
    if (formValues.ToDateTime) {
      formValues.ToDateTime = new Date(formValues.ToDateTime).toISOString();
    }

    this.assignmentAllTrips = [];
    console.log(formValues, "form searching assignment values");

    this.apiService.searchAss(formValues).subscribe(
      (res) => {
        this.assignmentAllTrips = res;
      },
      (error) => {
        console.error("Error fetching search results", error);
      }
    );
    console.log(this.assignmentAllTrips, "filtered reservations");

  }


  // resourceSearching() {
  //   this.assignmentAllTrips = [];
  //   console.log(this.AssignmentSearchForm.value, "form values");

  //   this.apiService.searchAss(this.AssignmentSearchForm.value).subscribe(
  //     (res) => {
  //       this.assignmentAllTrips = res;
  //     },
  //     (error) => {
  //       console.error("Error fetching search results", error);
  //     }
  //   );
  //   console.log(this.assignmentAllTrips, "filtered reservations");
  // }

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

  getRelatedTrips(ReservationId: any) {
    this.tripAssignmentData = [];
    this.apiService
      .getRelatedTrip(ReservationId)
      .subscribe((tripNumbers: any) => {
        for (const a of tripNumbers) {
          this.tripAssignmentData.push(a);
        }
      });
    console.log(this.tripAssignmentData, "esdurfiyuuu");
  }

  fetchTrip(TripId: any) {
    this.fetchedTripList = [];
    this.BookingData = [];
    this.apiService.getRelatedTrip(TripId).subscribe((relatedTrip) => {
      console.log(relatedTrip, "fttyfty");
      for (const r of relatedTrip) {
        this.fetchedTripList.push(r);
      }

      for (const d of this.fetchedTripList) {
        this.tripAssignmentForm.patchValue({
          DriverServiceStatus: d.DriverServiceStatus,
          TripStatus: d.TripStatus,
          VehicleMarks: d.VehicleMarks,
          FromDateTime: moment(d.FromDateTime).format("YYYY-MM-DD HH:mm"),
          ToDateTime: moment(d.ToDateTime).format("YYYY-MM-DD HH:mm"),
          FlightNo: d.FlightNo,
          FlightDateTime: moment(d.FlightDateTime).format("YYYY-MM-DD HH:mm"),
          Airline: d.Airline,
          PickupAddress: d.PickupAddress,
          PickupContactNo: d.PickupContactNo,
          PickupEmail: d.PickupEmail,
          BookingFor: d.BookingFor,
          DropAddress: d.DropAddress,
          VehicleMake: d.VehicleMake,
          VehicleModel: d.VehicleModel,
          BookingNo: d.BookingNo,
          ReservationId: d.ReservationId,
          tripNumber: d.tripNumber,
          TripId: d.TripId,
          BookingCategory: d.BookingCategory,
          vehicleID: d.vehicleID,
          DriverId: d.DriverId,
          DriverFirstName: d.DriverFirstName,
          vehicleRegNo: d.vehicleRegNo
        });

        console.log(d.PickupName, "driverr patched");
        this.fetchModels(d.VehicleMake);
        this.fetchVehiclesByModel(d.VehicleModel);


      }

    });

  }



  getVehicleRegNo(vehicleModel: string) {
    if (vehicleModel) {
      this.apiService.assignVehicle(vehicleModel).subscribe((res) => {
        console.log('Api response', res);
        this.fetchedVehicleList = res;
        console.log('VehicleModel', vehicleModel);
      });
    }

  }






  checkVehicleAssignment(vehicleID: Number, FromDateTime: any, ToDateTime: any) {
    console.log("myvehicleid", vehicleID, FromDateTime, ToDateTime);
    // this.vehicleAssignedError = "";

    const vehicleDetails = {
      vehicleID:Number(vehicleID),
      FromDateTime: moment(FromDateTime).format("YYYY-MM-DD HH:mm"),
      ToDateTime: moment(ToDateTime).format("YYYY-MM-DD HH:mm"),
    };



    console.log(vehicleDetails, 'vehicle DDDdetails');
    // Add your logic here, e.g., call an API or perform validation


    this.apiService.validateVehicle(vehicleDetails).subscribe((res) => {
      console.log("ResponsfroValidateVehicle:", res);


      if (res && res.length > 0) {
        const confirmProceed = window.confirm(
          `This Vehicle has already been assigned to TripNo: ${res[0].TripId}. Do you wish to proceed?`
        );
        if (!confirmProceed) {
          this.vehicleAssignedError = "This vehicle is already assigned.";
        } else {
          this.tripAssignmentForm.get('vehicleID').setValue(vehicleID);
          this.tripAssignmentForm.patchValue({vehicleID:vehicleID})
          this.tripAssignmentForm.get('TripStatus').setValue('Scheduled');
        }
      } else {
        // If no conflict, proceed with assignment
        this.tripAssignmentForm.get('vehicleID').setValue(vehicleID);
        this.tripAssignmentForm.get('TripStatus').setValue('Scheduled');
      }
    });
    
  }






  navigateTo(page: string) {
    this.router.navigate([page]);
    console.log("navigationss", page);
  }

  checkDriverAssignment(driver: any, FromDateTime: any, ToDateTime: any) {
    console.log("drivervalidation success", FromDateTime, ToDateTime, driver);
    const driverDetails = {
      DriverId: driver,
      DriverFirstName: "",
      FromDateTime: "",
      ToDateTime: "",
    };
    driverDetails.DriverId = driver;
    driverDetails.DriverFirstName = driver;
    driverDetails.FromDateTime = FromDateTime;
    driverDetails.ToDateTime = ToDateTime;
    console.log(driverDetails, "drivers wako?");
    JSON.stringify(driverDetails);
    console.log(driverDetails);
    this.apiService.validateDriver(driverDetails).subscribe((response) => {
      console.log("driveeeeeeeeeerssssssssssssssssssss", response);

      this.driverAssignedError = response;
      console.log("doone");
      if (this.driverAssignedError.length != 0) {
        const confirmProceed = window.confirm(
          "This Driver has already been assigned to TripNo: " +
          response[0].TripId +
          " do you wish to proceed?"
        );
        if (!confirmProceed) {
          this.driverAssignedError = false;
          this.driverAssignedError = false;
        } else {
          this.tripAssignmentForm.get('DriverId').setValue(driver);
          this.tripAssignmentForm.get('DriverServiceStatus').setValue('Scheduled');
        }
      } else {
        // If no conflict, proceed with assignment
        this.tripAssignmentForm.get('DriverId').setValue(driver);
        this.tripAssignmentForm.get('DriverServiceStatus').setValue('Scheduled');


        // }
      }
    });
  }


  printForm() {
    const printableContent = this.rentalAgreement.nativeElement.innerHTML;
    const originalContent = document.body.innerHTML;
    document.body.innerHTML = printableContent;
    window.print();
    document.body.innerHTML = originalContent;
    console.log("printable", printableContent);
  }

  editTripAssignment(TripId: any) {
    console.log(TripId, "friday");
    this.tripAssignmentList = [];

    JSON.stringify(this.tripAssignmentForm.value);

    console.log(this.tripAssignmentForm.value, ".......trip assignment");



    this.apiService.editTrip(TripId, this.tripAssignmentForm.value).subscribe((assign) => {
      console.log(assign, ".......trip ass");
      for (const r of assign) {
        this.assignmentAllTrips.push(r)
      }
      // this.assignmentAllTrips = assign
      // this.getRelatedTrips(this.tripAssignmentForm.value.ReservationId)
    });
    console.log('ovcwyey');
    this.getallTrips()



    const confirmProceed = window.confirm('Do you wish to generate a CDO?')
    if (confirmProceed) {
      this.generateCDO(TripId)
    }


  }
  fetchVehiclesByModel(Model: any) {
    this.fetchedVehicleList = [];
    this.apiService.getVehicleByModel(Model).subscribe((vehicleModel) => {
      for (const ve of vehicleModel) {
        this.fetchedVehicleList.push(ve);
      }

      console.log(this.fetchedVehicleList, "fetched");
    });
  }
  fetchChauffers(Name: any) {
    this.apiService.getChaufferById(Name).subscribe((DriverFirstName) => {
      this.DriversNameList = [];
      for (const j of DriverFirstName) {
        this.DriversNameList.push(j);
      }
      console.log(this.DriversNameList, "fetchedDrivers");
    });
  }

  getallTrips() {
    this.assignmentAllTrips = [];
    this.apiService.fetchAllTrips().subscribe((trips) => {
      for (const m of trips) {
        // if (m.TripStatus === 'InProgress') {
          this.assignmentAllTrips.push(m);
        // }
      }
      console.log(this.assignmentAllTrips, "yuitd");
    });
  }

  openEditAssignment(editAssignment: any) {
    console.log("openeditTripAssignment");

    this.modalService.open(editAssignment, { size: "lg" }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  // generating the CDO











  generateCDO(TripId: any) {
    console.log('CDOTRIPID', TripId);
    this.fetchedCDOData = [];
    // this.BookingData = [];
    this.apiService.getRelatedTrip(TripId).subscribe((TripInfo) => {
      console.log(TripInfo, "iisasgav");

      // for (const r of relatedTrip) {
      //   this.fetchedTripList.push(r);
      // }
      for (const r of TripInfo) {

        this.fetchedCDOData.push(r);
        console.log('cdo data',this.fetchedCDOData)

      }

      if (this.fetchedCDOData.length > 0) {
        console.log('gyytgygh');


        for (const d of this.fetchedCDOData) {
          console.log('eric eric', d.BookingCategory)
          try {
            const doc = new jsPDF({
              orientation: "p",
              unit: "mm",
              format: "a4",
            });

            // Title
            doc.setFontSize(20);
            doc.setFont("arial");
            doc.text("DRIVER ORDER", 105, 10, { align: "center" }, null);

            // Header information 
            doc.setFontSize(8);
            doc.setFont("arial", "bold");

            doc.text("Office Line: +254 707 603009 | +254 722 513303", 10, 35);
            doc.text(
              "Office Line: +254 797486389",
              202,
              35,
              { align: "right" },
              null
            );
            doc.text("POBox 45757-0100, Nairobi, Kenya", 10, 39);
            doc.text("JKIA (Airport)", 202, 39, { align: "right" }, null);
            doc.text("Office:Off Musa Gitau Road, Waiyaki Way", 10, 43);
            doc.text(
              "Airport:Office No.9 Parking silo ,Ground Floor",
              202,
              43,
              { align: "right" },
              null
            );
            doc.text("info@executiverentalsltd.com", 10, 47);
            doc.text(
              "hertzkenya@executiverentalsltd.com",
              202,
              47,
              { align: "right" },
              null
            );

            // Organization, Client, and Booking details
            doc.rect(10, 60, 70, 40);
            doc.setFontSize(9);
            doc.text("Organization:", 12, 64);
            doc.text(d.companyName, 12, 70);
            doc.text("Client Name:", 12, 80);
            doc.text(d.companyName, 12, 86);

            doc.text("Booked by:", 12, 95);
            doc.text(d.BookingFor, 12, 98);


            doc.text("Veh.Reg", 81, 64);
            doc.text(d.vehicleRegNo,81,70);
            doc.text("Type", 81, 73);
            doc.line(90, 73, 130, 73);
            doc.text("Pick-up location", 81, 84);
            doc.text(d.PickupAddress, 81, 90);

            doc.line(110, 84, 130, 84);
            doc.text("Pick-up time", 81, 93);
            doc.line(102, 93, 130, 93);

            doc.text("CDO.PT_______________", 140, 55);
            doc.text(d.BookingNo + "/"+ d.tripNumber, 160, 55);

            doc.text("Date In:", 140, 64);
            doc.line(153, 64, 180, 64);
            doc.text("Date Out:", 140, 73);
            doc.line(157, 73, 180, 73);
            doc.text("Time", 180, 64);
            doc.line(190, 64, 200, 64);
            doc.text("Time", 180, 73);
            doc.line(190, 73, 200, 73);

            doc.rect(134, 78, 74, 22.5);
            doc.setFontSize(8);
            doc.rect(134, 85, 74, 8);
            doc.line(152, 78, 152, 100);
            doc.line(161, 78, 161, 100);
            doc.line(170, 78, 170, 100);
            doc.line(179, 78, 179, 100);
            doc.line(188, 78, 188, 100);
            doc.line(197, 78, 197, 100);
            doc.text("Kms In", 136, 83);
            doc.text("Kms Out", 136, 91);
            doc.text("Kms Driven", 136, 99);

            doc.setFont("helvetica", "bold");
            doc.setFontSize(14);
            doc.text("SERVICE INSTRUCTIONS", 105, 110, { align: "center" }, null);
            doc.rect(10, 115, 190, 60); // Rectangle for Service Instructions
            

            doc.rect(10, 180, 110, 90);
            // Expenses Table header
            doc.setFontSize(10);
            doc.text("Imprest", 12, 185);
            doc.text("Safari Expense", 60, 185);
            doc.text("Cost", 100, 185);
            doc.rect(58, 180, 42, 90);
            doc.line(10, 188, 120, 188);
            // Expense table imprest row
            doc.text("ALLOWANCE", 12, 195);
            doc.line(10, 198, 120, 198);
            doc.text("FUEL", 12, 205);
            doc.line(10, 208, 120, 208);
            doc.text("PARK ENTRY", 12, 215);
            doc.line(10, 218, 120, 218);
            doc.text("FUEL", 12, 225);
            doc.line(10, 228, 120, 228);
            doc.text("PARKING", 12, 235);
            doc.line(10, 238, 120, 238);
            doc.text("EXPRESSWAY", 12, 245);
            doc.line(10, 248, 120, 248);
            doc.text("TOTAL", 12, 255);
            doc.line(10, 258, 120, 258);
            doc.text("RETURN/REFUNDS", 12, 265);

            // Fuel information
            doc.text("Fuel in:", 125, 185);
            doc.line(137, 185, 200, 185);
            doc.text("Fuel out:", 125, 195);
            doc.line(139, 195, 200, 195);
            doc.text("Driver:", 125, 205);
            doc.line(136, 205, 200, 205);
            doc.text("Imprest Kshs:", 125, 215);
            doc.line(148, 215, 200, 215);
            doc.text("Additional Imprest Kshs:", 125, 225);
            doc.line(166, 225, 200, 225);
            doc.text("Additional Imprest Kshs:", 125, 235);
            doc.line(166, 235, 200, 235);
            doc.text("Driver Sign:", 125, 245);
            doc.line(145, 245, 200, 245);
            doc.text("Expressway (YES/NO):", 125, 255);
            doc.line(162, 255, 200, 255);
            doc.text("Client’s Signature:", 125, 265);
            doc.line(157, 265, 200, 265);

            // Add a new page
            doc.addPage();

            // Second page content
            doc.setFontSize(12);
            doc.text("DRIVER'S LOG SHEET", 80, 10);
            doc.line(35, 23, 145, 23);
            doc.setFontSize(10);
            doc.text("Driver's Name:", 10, 23);
            doc.text(d.DriverFirstName,10,29)
            doc.text("Veh. No.:", 150, 23);
            doc.line(163, 23, 190, 23);
            doc.text("File Ref.:", 150, 33);
            doc.line(163, 33, 190, 33);

            doc.setLineWidth(0.5);

            // Table headers
            const headers = [
              "DATE",
              "FROM",
              "TO",
              "SPEEDO OUT",
              "SPEEDO IN",
              "KMS DRIVEN",
              "TIME OUT",
              "TIME IN",
            ];
            let startY = 40;
            let startX = 6;
            let cellWidth = 25;
            let cellHeight = 10;

            headers.forEach((header, index) => {
              doc.rect(startX + index * cellWidth, startY, cellWidth, cellHeight);
              doc.text(header, startX + index * cellWidth + 1, startY + 7);
            });

            // Table rows
            const rows = 20;
            for (let i = 0; i < rows; i++) {
              for (let j = 0; j < headers.length; j++) {
                doc.rect(
                  startX + j * cellWidth,
                  startY + cellHeight + i * cellHeight,
                  cellWidth,
                  cellHeight
                );
              }
            }

            // // Convert to Blob and create Object URL
            // const pdfBlob = doc.output('blob');
            // const pdfUrl = URL.createObjectURL(pdfBlob);

            // Display in iframe
            // document.getElementById('pdfFrame').src = pdfUrl;

            doc.save("CDO for " + d.companyName + "-trip-" + d.TripNo + ".pdf");
          }
          catch (error) {
            console.log('major error !!', error)
          }
        };
      }
      else {
        try {
          const doc = new jsPDF({
            orientation: "p",
            unit: "mm",
            format: "a4",
          });

          // Title
          doc.setFontSize(20);
          doc.setFont("arial");
          doc.text("DRIVER ORDER", 105, 10, { align: "center" }, null);

          // Header information 
          doc.setFontSize(8);
          doc.setFont("arial", "bold");

          doc.text("Office Line: +254 707 603009 | +254 722 513303", 10, 35);
          doc.text(
            "Office Line: +254 797486389",
            202,
            35,
            { align: "right" },
            null
          );
          doc.text("POBox 45757-0100, Nairobi, Kenya", 10, 39);
          doc.text("JKIA (Airport)", 202, 39, { align: "right" }, null);
          doc.text("Office:Off Musa Gitau Road, Waiyaki Way", 10, 43);
          doc.text(
            "Airport:Office No.9 Parking silo ,Ground Floor",
            202,
            43,
            { align: "right" },
            null
          );
          doc.text("info@executiverentalsltd.com", 10, 47);
          doc.text(
            "hertzkenya@executiverentalsltd.com",
            202,
            47,
            { align: "right" },
            null
          );

          // Organization, Client, and Booking details
          doc.rect(10, 60, 70, 40);
          doc.setFontSize(12);
          doc.text("Organization:", 12, 64);
          doc.text('', 12, 70);
          doc.text("Client Name:", 12, 80);
          doc.text("Booked by:", 12, 95);

          doc.text("Veh.Reg", 81, 64);
          doc.line(97, 64, 130, 64);
          doc.text("Type", 81, 73);
          doc.line(90, 73, 130, 73);
          doc.text("Pick-up location", 81, 84);
          doc.line(110, 84, 130, 84);
          doc.text("Pick-up time", 81, 93);
          doc.line(102, 93, 130, 93);

          doc.text("CDO.PT_______________", 140, 55);
          doc.text("Date In:", 140, 64);
          doc.line(153, 64, 180, 64);
          doc.text("Date Out:", 140, 73);
          doc.line(157, 73, 180, 73);
          doc.text("Time", 180, 64);
          doc.line(190, 64, 200, 64);
          doc.text("Time", 180, 73);
          doc.line(190, 73, 200, 73);

          doc.rect(134, 78, 74, 22.5);
          doc.setFontSize(8);
          doc.rect(134, 85, 74, 8);
          doc.line(152, 78, 152, 100);
          doc.line(161, 78, 161, 100);
          doc.line(170, 78, 170, 100);
          doc.line(179, 78, 179, 100);
          doc.line(188, 78, 188, 100);
          doc.line(197, 78, 197, 100);
          doc.text("Kms In", 136, 83);
          doc.text("Kms Out", 136, 91);
          doc.text("Kms Driven", 136, 99);

          doc.setFont("helvetica", "bold");
          doc.setFontSize(14);
          doc.text("SERVICE INSTRUCTIONS", 105, 110, { align: "center" }, null);
          doc.rect(10, 115, 190, 60); // Rectangle for Service Instructions

          doc.rect(10, 180, 110, 90);
          // Expenses Table header
          doc.setFontSize(10);
          doc.text("Imprest", 12, 185);
          doc.text("Safari Expense", 60, 185);
          doc.text("Cost", 100, 185);
          doc.rect(58, 180, 42, 90);
          doc.line(10, 188, 120, 188);
          // Expense table imprest row
          doc.text("ALLOWANCE", 12, 195);
          doc.line(10, 198, 120, 198);
          doc.text("FUEL", 12, 205);
          doc.line(10, 208, 120, 208);
          doc.text("PARK ENTRY", 12, 215);
          doc.line(10, 218, 120, 218);
          doc.text("FUEL", 12, 225);
          doc.line(10, 228, 120, 228);
          doc.text("PARKING", 12, 235);
          doc.line(10, 238, 120, 238);
          doc.text("EXPRESSWAY", 12, 245);
          doc.line(10, 248, 120, 248);
          doc.text("TOTAL", 12, 255);
          doc.line(10, 258, 120, 258);
          doc.text("RETURN/REFUNDS", 12, 265);

          // Fuel information
          doc.text("Fuel in:", 125, 185);
          doc.line(137, 185, 200, 185);
          doc.text("Fuel out:", 125, 195);
          doc.line(139, 195, 200, 195);
          doc.text("Driver:", 125, 205);
          doc.line(136, 205, 200, 205);
          doc.text("Imprest Kshs:", 125, 215);
          doc.line(148, 215, 200, 215);
          doc.text("Additional Imprest Kshs:", 125, 225);
          doc.line(166, 225, 200, 225);
          doc.text("Additional Imprest Kshs:", 125, 235);
          doc.line(166, 235, 200, 235);
          doc.text("Driver Sign:", 125, 245);
          doc.line(145, 245, 200, 245);
          doc.text("Expressway (YES/NO):", 125, 255);
          doc.line(162, 255, 200, 255);
          doc.text("Client’s Signature:", 125, 265);
          doc.line(157, 265, 200, 265);

          // Add a new page
          doc.addPage();

          // Second page content
          doc.setFontSize(12);
          doc.text("DRIVER'S LOG SHEET", 80, 10);
          doc.line(35, 23, 145, 23);
          doc.setFontSize(10);
          doc.text("Driver's Name:", 10, 23);
          doc.text("Veh. No.:", 150, 23);
          doc.line(163, 23, 190, 23);
          doc.text("File Ref.:", 150, 33);
          doc.line(163, 33, 190, 33);

          doc.setLineWidth(0.5);

          // Table headers
          const headers = [
            "DATE",
            "FROM",
            "TO",
            "SPEEDO OUT",
            "SPEEDO IN",
            "KMS DRIVEN",
            "TIME OUT",
            "TIME IN",
          ];
          let startY = 40;
          let startX = 6;
          let cellWidth = 25;
          let cellHeight = 10;

          headers.forEach((header, index) => {
            doc.rect(startX + index * cellWidth, startY, cellWidth, cellHeight);
            doc.text(header, startX + index * cellWidth + 1, startY + 7);
          });

          // Table rows
          const rows = 20;
          for (let i = 0; i < rows; i++) {
            for (let j = 0; j < headers.length; j++) {
              doc.rect(
                startX + j * cellWidth,
                startY + cellHeight + i * cellHeight,
                cellWidth,
                cellHeight
              );
            }
          }

          // // Convert to Blob and create Object URL
          // const pdfBlob = doc.output('blob');
          // const pdfUrl = URL.createObjectURL(pdfBlob);

          // Display in iframe
          // document.getElementById('pdfFrame').src = pdfUrl;

          doc.save("CDO.pdf");
        }
        catch (error) {
          console.log('major error !!', error)
        }
      };

    })
  }


}
