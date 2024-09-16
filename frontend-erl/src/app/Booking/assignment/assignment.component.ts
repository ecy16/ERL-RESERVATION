import { Component, inject, TemplateRef } from "@angular/core";
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
  TripId: any;
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
  isVehicleAssigned: boolean = false;
  selectedTransaction: string = '';


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
  deliveryForm: any
  deliveryList: any
  AllTransactions: any;
  fetchedRAData: any;



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
    this.fetchedRAData = [];
    this.AllTransactions = []



    this.tripAssignmentList = [];
    this.tripAssignmentForm = this.formBuilder.group({
      DriverServiceStatus: "",
      tripNumber: "",
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
      Remarks: ""
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

    this.deliveryForm = this.formBuilder.group({
      tripNumber: ['', Validators.required],
      TripId: ['', Validators.required],
      VehicleMake: ['', Validators.required],
      VehicleModel: ['', Validators.required],
      vehicleRegNo: ['', Validators.required],
      Destination: ['', Validators.required],
      Time: ['', Validators.required],
      DeliveredBy: ['', Validators.required],
      CollectedBy: ['', Validators.required],
      FuelIN: ['', Validators.required],
      FuelOUT: ['', Validators.required],
      MileageIN: ['', Validators.required],
      MileageOUT: ['', Validators.required],
      IncidentsType: ['', Validators.required],
      IncidentDate: ['', Validators.required],
      Remarks: ['', Validators.required],
      ReportedBy: ['', Validators.required],
      BookingFor: ['', Validators.required],
      vehicleIN: [''],
      vehicleOUT: [''],
      PickupContactNo: [''],
      PickupEmail: [''],
      Collection: [''],
      Transaction: [''],
      BookingDate: [''],
      PickupAddress: [''],
      DriverFirstName: [''],
      FromDate: [''],
      FromTime: [''],
      BookingNo: [''],
      BookingCategory: ['']

    });
    this.deliveryForm.patchValue({
      TripId: this.actRoute.snapshot.params["TripId"],
    });
  }

  ngOnInit() {




    this.apiService.getAllTrip().subscribe((res: any[]) => {
      console.log("Filtered reservations:", res);
      this.assignmentData = [...this.filteredReservations];
    });



    const selectedVehicleModel = this.tripAssignmentForm.get('VehicleModel').value;

    // Fetch vehicle details based on the pre-selected model if it exists
    if (selectedVehicleModel) {
      this.getVehicleRegNo(selectedVehicleModel);
    }

    // Optionally, subscribe to model changes if you want to refetch data when the model changes
    this.tripAssignmentForm.get('VehicleModel').valueChanges.subscribe((model: string) => {
      if (model) {
        this.getVehicleRegNo(model);
      }
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
    this.apiService.getVehicleModel(VehicleMake).subscribe((VehicleModel) => {
      this.vehicleModelList = [];
      for (const g of VehicleModel) {
        this.vehicleModelList.push(g);
      }
      console.log(VehicleModel, "vehiclechanges");
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

  fetchDetails(TripId: any) {
    console.log('WERTYU', TripId)
    this.apiService.fetchTrips(TripId).subscribe((res) => {
      console.log('deliverysxh', res)
      for (const dd of res) {
        this.deliveryForm.patchValue({
          tripNumber: dd.tripNumber,
          BookingFor: dd.BookingFor,
          PickupContactNo: dd.PickupContactNo,
          PickupEmail: dd.PickupEmail,
          VehicleModel: dd.VehicleModel,
          VehicleMake: dd.VehicleMake,
          vehicleRegNo: dd.vehicleRegNo,
          BookingDate: dd.BookingDate,
          TripStatus: dd.TripStatus,
          BookingCategory: dd.BookingCategory
        })
        console.log('deliverysxh', this.deliveryForm.value)

      }

    })
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
          // FlightDateTime: moment(d.FlightDateTime).format("YYYY-MM-DD HH:mm"),
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
          vehicleRegNo: d.vehicleRegNo,
          Remarks: d.Remarks,
          
        });

        console.log(d.PickupName, "driverr patched");
        this.fetchModels(d.VehicleMake);
        this.fetchVehiclesByModel(d.VehicleModel);


      }

    });

  }







  navigateTo(page: string) {
    this.router.navigate([page]);
    console.log("navigationss", page);
  }




  getVehicleRegNo(vehicleModel: string) {
    if (vehicleModel) {
      this.apiService.assignVehicle(vehicleModel).subscribe((res) => {
        this.fetchedVehicleList = res;
        // Only fetching the vehicle list; assignment logic should be elsewhere
      });
    }
  }

  onVehicleChange(event: any) {
    const vehicleID = event.target.value;
    const vehicleRegNo = event.target.selectedOptions[0].getAttribute('data-regno').toString();
    const FromDateTime = this.tripAssignmentForm.get('FromDateTime')?.value;
    const ToDateTime = this.tripAssignmentForm.get('ToDateTime')?.value;

    this.checkVehicleAssignment(vehicleID, vehicleRegNo, FromDateTime, ToDateTime);
  }

  checkVehicleAssignment(vehicleID: number, vehicleRegNo: string, FromDateTime: any, ToDateTime: any) {
    const vehicleDetails = {
      vehicleID: Number(vehicleID),
      vehicleRegNo: String(vehicleRegNo),
      FromDateTime: moment(FromDateTime).format("YYYY-MM-DD HH:mm"),
      ToDateTime: moment(ToDateTime).format("YYYY-MM-DD HH:mm"),


    };
    console.log('vehicleDetails', vehicleDetails)
    this.apiService.validateVehicle(vehicleDetails).subscribe((res) => {
      if (res && res.length > 0) {
        const confirmProceed = window.confirm(
          `This Vehicle has already been assigned to TripNo: ${res[0].TripId}. Do you wish to proceed?`
        );
        if (!confirmProceed) {
          this.vehicleAssignedError = "This vehicle is already assigned.";
        } else {

          this.tripAssignmentForm.patchValue({
            vehicleID: vehicleID,
            vehicleRegNo: vehicleRegNo,
            TripStatus: 'Scheduled'
          });
        }
      } else {
        this.tripAssignmentForm.patchValue({
          vehicleID: vehicleID,
          vehicleRegNo: vehicleRegNo,
          TripStatus: 'Scheduled'
        });
      }
    });


  }

  // assignVehicleToTrip(vehicleID: number, vehicleRegNo: string) {
  //   // Only assign the vehicle once
  //   this.tripAssignmentForm.patchValue({
  //     vehicleID: vehicleID,
  //     vehicleRegNo: vehicleRegNo,
  //     TripStatus: 'Scheduled'
  //   });

  //   console.log('Vehicle assigned:', vehicleRegNo);
  // }





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

  assignResource(TripId: any) {
    console.log(TripId, 'Clicked')
    JSON.stringify(this.tripAssignmentForm.value)

    console.log('onclick', this.tripAssignmentForm.value)

    this.apiService.editTrip(TripId, this.tripAssignmentForm.value).subscribe((assign) => {
      console.log(assign, ".......trip ass");

      // for (const r of assign) {
      this.assignmentAllTrips.push(assign)
      // }
    });
    const isChauffeurDriven = this.tripAssignmentForm.value.BookingCategory === 'ChaufferDriven';

    // Show confirmation pop-up only for chauffeur-driven cars
    if (isChauffeurDriven) {
      const confirmProceed = window.confirm('Do you wish to generate a CDO?');
      if (confirmProceed) {
        this.generateCDO(TripId);
      }
    }
    this.getallTrips()


    console.log('Assignment', this.tripAssignmentForm.value)
    this.toastr.success(" Resource Assigned  successfully");


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





  vehicleMovement(TripId: any) {
    console.log('TripId', TripId)

    this.apiService.fetchDeliverTrips(TripId).subscribe((res) => {
      console.log('vehiclemovementresponse', res)

      for (const dd of res) {
        this.deliveryForm.patchValue({
          BookingNo: dd.BookingNo,
          tripNumber: dd.tripNumber,
          BookingFor: dd.BookingFor,
          PickupContactNo: dd.PickupContactNo,
          PickupEmail: dd.PickupEmail,
          VehicleModel: dd.VehicleModel,
          VehicleMake: dd.VehicleMake,
          vehicleRegNo: dd.vehicleRegNo,
          BookingDate: dd.BookingDate,
          PickupAddress: dd.PickupAddress,
          DriverFirstName: dd.DriverFirstName,
          FromDate: dd.FromDate,
          FromTime: dd.FromTime,
          vehicleIN: dd.vehicleIN,
          vehicleOUT: dd.vehicleOUT,
          TripId: dd.TripId,
          TripStatus: dd.TripStatus,
          BookingCategory:dd.BookingCategory
        })
        console.log('vehiclemovementpatched', this.tripAssignmentForm.value)

      }

    })

  }

  addDelivery() {
    console.log('delivery clicked')
    this.AllTransactions = []
    JSON.stringify(this.deliveryForm.value);
    console.log("Delivery saved", this.deliveryForm.value)
    // this.AllTransactions.push(this.deliveryForm.value, 'deliveryList')
    this.apiService.addTransaction(this.deliveryForm.value).subscribe((res) => {
      console.log('AddFuels', res)
      this.AllTransactions.push(res)
    })


    const isSelfDriven = this.deliveryForm.value.BookingCategory === 'SelfDriven';



    if (isSelfDriven) {
      const confirmProceed = window.confirm('Do you wish to generate a RentalAgreement?');
      if (confirmProceed) {
        this.generateRA(this.TripId)
      }
    }



    this.toastr.success(" Mileage & Fuel Added successfully");

  }




  openForm(delivery: TemplateRef<any>) {
    this.modalService.open(delivery, { size: "lg" }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  generateRA(TripId: any) {
    this.fetchedRAData = [];


    this.apiService.getRelatedTrip(TripId).subscribe((TripDetails) => {
      console.log(TripDetails, "TripDetails");

      for (const y of TripDetails) {
        this.fetchedRAData.push(y)
        console.log('fetchedRAData', this.fetchedRAData)

      }

      if (this.fetchedRAData.length > 0) {
        console.log('if');


        for (const d of this.fetchedRAData) {
          console.log('Rental-AGREEMENT', d)

          try {
            const doc = new jsPDF({
              orientation: "p",
              unit: "mm",
              format: "a4",
            });
            doc.setFontSize(20);
            doc.setFont('impact');
            doc.text('RENTAL AGREEMENT', 105, 10, { align: "center" }, null);


            const base64Img2 = 'data:image/png;base64,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';
            const base64Image1 = 'data:image/png;base64,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';
            const img2 = new Image();
            img2.src = base64Image1;
            const img = new Image();
            img.src = base64Img2;

            img.onload = function () {
              doc.addImage(img, 'png', 155, 3, 50, 30,); // Adjust position and size as needed
              doc.addImage(img2, 'png', 8, 3, 50, 30); // Adjust position and size as needed

              // Header information
              doc.setFontSize(8);
              doc.setFont('arial', 'bold');

              doc.text('Office Line: +254 707 603009 | +254 722 513303', 10, 35);
              doc.text('Office Line: +254 797486389', 202, 35, { align: "right" }, null);
              doc.text('POBox 45757-0100, Nairobi, Kenya', 10, 39);
              doc.text('JKIA (Airport)', 202, 39, { align: "right" }, null);
              doc.text('Office:Off Musa Gitau Road, Waiyaki Way', 10, 43);
              doc.text('Airport:Office No.9 Parking silo ,Ground Floor', 202, 43, { align: "right" }, null);
              doc.text('info@executiverentalsltd.com', 10, 47);
              doc.text('hertzkenya@executiverentalsltd.com', 202, 47, { align: "right" }, null);
              doc.setFontSize(10);
              doc.text('PIN:P0511762761', 10, 50);
              doc.text('VAT:0151893Z', 202, 50, { align: "right" });

              //create the overall box
              doc.rect(10, 52, 192, 240);
              doc.line(107, 52, 107, 292);
              doc.line(10, 57, 202, 57);
              doc.line(10, 62, 202, 62);

              //customer information
              doc.text('Customer name:', 12, 56);
              doc.text(d.BookingFor, 50, 56); // Adjusted x position for better alignment

              doc.text('Renter name:', 12, 61);
              doc.text(d.BookingFor, 50, 61); // Adjusted x position

              doc.text('Contact Address:', 12, 66);
              doc.text(d.PickupAddress, 50, 66); // Adjusted x position for address

              // Horizontal line
              doc.line(10, 68, 107, 68); // Adjusted line position slightly

              doc.text('Tel:', 12, 72);
              doc.text(d.PickupContactNo, 50, 72); // Adjusted x position for contact number

              // Horizontal line
              doc.line(10, 73, 107, 73); // Adjusted line position

              doc.text('Email:', 12, 77);
              doc.text(d.PickupEmail, 50, 77); // Adjusted x position for email

              // Horizontal line
              doc.line(10, 78, 107, 78); // Adjusted line position

              doc.text('Place/Business:', 12, 82);
              doc.text(d.companyName, 50, 82); // Adjusted x position for company name

              // Horizontal line
              doc.line(10, 83, 107, 83); // Adjusted line position

              doc.text('Address:', 12, 87);
              doc.text(d.PickupAddress, 50, 87); // Adjusted x position for address


              doc.line(10, 87, 107, 87);
              doc.text('Driver License', 12, 91);

              doc.line(10, 97, 107, 97);
              doc.text('Number:', 12, 95);
              doc.text('Date of', 70, 91)
              doc.text('Issue:', 70, 95);
              doc.text('Issued By:', 12, 101);
              doc.text('Issued By:', 12, 101);
              doc.text('Expiry Date:', 70, 101);
              doc.line(10, 102, 107, 102);

              doc.text('Place Of Birth:', 12, 106);
              doc.text('Date Of Birth:', 70, 106);
              doc.line(10, 107, 107, 107);

              doc.text('Passport Number:', 12, 111);
              doc.text('Number', 12, 115)
              doc.text('Country Of Issue:', 70, 111);
              doc.text('Issue:', 70, 115)
              doc.line(10, 117, 107, 117);

              doc.text('Date of Issue:', 12, 121);
              doc.line(10, 122, 107, 122);

              doc.text('Additional Driver:', 12, 126);
              doc.text('Date Of Birth:', 70, 126);
              doc.line(10, 127, 107, 127);

              doc.text('Driver License No:', 12, 131);
              doc.text('Number', 12, 135)
              doc.text('Date Of ', 70, 131);
              doc.text('Issue:', 70, 135)
              doc.line(10, 137, 107, 137);

              doc.text('Issued By:', 12, 141);
              doc.text('Expiry Date:', 70, 141);
              doc.line(10, 142, 107, 142);

              doc.setFontSize(6);
              doc.setFont('helvetica', 'normal');
              const paragraph3 = 'SALOON/RAV 4 CARS NOT PERMITTED TO BE DRIVEN OFF ROAD UNSURFACED ROADS OR GAME PARKS SURCHARGE OF USD 1000 WILL BE LEVIED.GAME PARKS SURCHARGE OF USD 1000 WILL BE LEVIED.EXPRESSWAY AND PARKING CHARGES WILL BE CHARGED AT THE END OF THE RENTAL.REPAIR CHARGES FROM ROADSIDE MECHANICS WILL NOT BE REFUNDED.PLEASE READ DETAILS ON THE BACK OF THE AGREEMENT RELATING TO CDW/TP.TYRES AND TUBES ARE NOTE COVERED BY INSURANCE.'

              doc.text(paragraph3, 12, 146, {
                maxWidth: 95,

              });


              doc.setFontSize(10)
              doc.text('Renter Signature___________________________________', 11, 162,);
              doc.line(10, 165, 107, 165);

              //kms vehicle vertical lines
              doc.rect(10, 166, 97, 30);
              doc.line(25, 166, 25, 196);
              doc.line(40, 166, 40, 196);
              doc.line(60, 166, 60, 196);
              doc.line(70, 166, 70, 196);
              doc.line(97, 166, 97, 196);

              //kms vehicle horizontal lines
              doc.line(10, 176, 107, 176);
              doc.line(10, 181, 107, 181);
              doc.line(10, 186, 107, 186);
              doc.line(10, 191, 107, 191);

              doc.setFontSize(7);
              doc.text('Vehicle', 11, 169);
              doc.text('Exchange ', 11, 172);
              doc.text('Date', 11, 175);
              doc.text('Vehicle', 27, 169);
              doc.text('No', 27, 172);
              doc.text('Model', 42, 169);
              doc.text('Kms In', 61, 169);
              doc.text('Kms Out ', 71, 169);
              doc.text('Kms Driven', 83, 169);
              doc.text('Fuel ', 98, 169);
              doc.text('Out/', 98, 172);
              doc.text('In', 98, 175);

              doc.rect(10, 197, 97, 10);
              doc.text('Car Exchange : Continued From', 12, 200);
              doc.text('Continued on R.A', 60, 200);
              doc.text('R.A', 12, 203);

              doc.rect(10, 209, 97, 8);
              doc.line(42, 209, 42, 217);
              doc.line(76, 209, 76, 217);

              doc.text('Supervisor', 12, 212);
              doc.text('RA Closed And', 43, 212);
              doc.text('Computed By:', 43, 215);
              doc.text('Manager', 77, 212);

              doc.text('PIN No:', 12, 220);
              doc.text('VAT:', 61, 220);
              doc.line(10, 222, 107, 222);


              doc.rect(10, 223, 97, 60);
              doc.line(30, 223, 30, 293);

              //immportant Clauses
              //heading
              doc.setFontSize(8);
              doc.setFont('hevatical', 'bold')
              doc.text('IMPORTANT CLAUSES', 42, 226);
              doc.line(42, 226.5, 72, 226.5);
              doc.text('COLLISION DAMAGE WAIVER (CDW)', 42, 229);
              doc.line(42, 229.5, 93, 229.5);

              doc.text('THEFT PROTECTION', 42, 256,);
              doc.line(42, 256.5, 72, 256.5)

              doc.setFont('hevatical', 'normal')
              doc.setFontSize(7.6);


              const paragraph1 = "By initialling the Accept box, renter agrees to pay an additional sum as specified in the official tariff valid at time of rental par day or part thereof and Hertz agrees to waiv erenter of all liability for loss or damage above the non waivable excess in accordance with the conditions in the current tariff to the Hertz vehicle referred to in this agreement while it is used,in conformity with the rental agreement, intentional or grossly negligent violation thereof excludes relief."

              const paragraph2 = "By initialling the Accept box renter agrees to pay an additional sum as specified in the official tariff valid at time of rental par day or part thereof and Hertz agrees to waive renter of all liability for theft, attempted or vandalism to Hertz vehicle during the rental, above the non waivable excess in accordance with the conditions in the current tariff to the Hertz vehicle referred to in this agreement while it is used, in conformity with the rental agreement, intentional or grossly negligent violation thereof excludes relief."

              doc.text(paragraph1, 32, 233, {
                maxWidth: 74,
              });
              doc.text(paragraph2, 32, 259, {
                maxWidth: 76,
              }
              );

              //accept and decline boxes
              doc.rect(15, 231, 3, 3);
              doc.rect(15, 241, 3, 3);
              doc.rect(15, 261, 3, 3);
              doc.rect(15, 271, 3, 3);



              doc.text('ACCEPT', 12, 228);
              doc.text('DECLINE', 12, 238);
              doc.text('ACCEPT', 12, 258);
              doc.text('DECLINE', 12, 268);



              //////////////////////////////////////////////////////////seccond half
              doc.setFontSize(8)
              doc.rect(127, 57, 75, 15);
              doc.rect(127, 72, 75, 15);
              doc.line(127, 72, 192, 72);
              doc.line(107, 72, 192, 72);
              doc.line(107, 87, 192, 87);
              doc.line(157, 57, 157, 87);
              doc.line(180, 57, 180, 87);


              doc.text('Rented At', 109, 56)
              doc.text('No', 159, 56)
              doc.text('Vehicle Reg', 109, 60.5)

              doc.setFont('arial', 'bold')

              doc.text('Check In', 129, 60.5);
              doc.text('Check Out', 129, 75.5)
              doc.setFont('arial', 'normal');

              doc.text('Location', 129, 65);
              doc.text('Date', 159, 65);
              doc.text('Time', 189, 65);
              doc.line(127, 68, 202, 67)

              doc.text('Model', 109, 75.5)
              doc.line(107, 77, 202, 77)

              doc.text('Location', 129, 80);
              doc.text('Date', 159, 80);
              doc.text('Time', 189, 80);
              doc.line(127, 82, 202, 82);


              doc.rect(127, 87, 75, 35)
              doc.line(107, 122, 202, 122)



              const paragraph4 = 'Licensed Carrying capacity ofVehicle (Two children under 12 years equivalent to one adult)'

              doc.text(paragraph4, 108, 89, {
                maxWidth: 14
              });


              doc.rect(127, 87, 75, 20);
              doc.line(127, 92, 202, 92);
              doc.line(170, 87, 170, 107);
              doc.text("RA opened by:", 129, 90)
              doc.text('Due Date:', 172, 90)

              doc.line(127, 112, 202, 112)
              doc.text('RA Closed by:', 129, 110)


              /////////////////////////////

              doc.rect(107, 123, 60, 25);
              doc.line(140, 123, 140, 148);


              doc.text("KMS IN", 108, 126);
              doc.line(107, 128, 167, 128);
              doc.text("KMS OUT", 108, 131);
              doc.line(107, 133, 167, 133);
              doc.text("KMS DRIVEN", 108, 135);
              doc.line(107, 137, 167, 137);
              doc.text("KMS ALLOWED IF ANY", 108, 140);
              doc.line(107, 142, 167, 142);
              doc.text('KMS CHARGED', 108, 145);



              doc.rect(107, 149, 60, 7);
              doc.text('TARIFF', 109, 152);
              doc.text('WLK', 140, 152);


              const paragraph5 = 'You will be held liable for any and all damage or loss and /or recovery of said vehicle, should the vehicle be deemed to have been used on an unsuitable road. The waivers do not cover damage caused while the vehicle is being driven on an untarred road or a road that is unsuitable for the vehicle type. ADDITIONAL CHARGES FOR THE NEXT CATEGORY OF SUV, GROUP (EO) WILL APPLY OVER AND ABOVE THE COST OF DAMAGES INCURRED ON THE SALOON CAR/RAV 4 TAKEN OFF ROAD.'

              doc.rect(107, 157, 60, 42);
              doc.text(paragraph5, 108, 165, {
                maxWidth: 60
              });






              doc.rect(107, 200, 60, 45)
              doc.text('FUEL', 109, 204);
              doc.line(107, 205, 167, 205);
              doc.text('Out', 109, 208);
              doc.text('F', 139, 208)
              doc.line(107, 210, 167, 210);
              doc.text('In', 109, 214);
              doc.text('E', 139, 214);
              doc.line(107, 215, 167, 215);
              doc.text('Credit Card', 109, 218);
              doc.text('Expiry Date', 139, 218);
              doc.line(107, 220, 167, 220);
              doc.line(107, 225, 167, 225);
              doc.text('Type Of CreditCard', 109, 228);
              doc.text('Approve Coded', 139, 228);
              doc.line(107, 230, 167, 230);
              doc.line(107, 235, 167, 235);
              doc.text('Contact Name', 109, 238);
              doc.text('Approve Code By', 139, 238);
              doc.line(107, 240, 167, 240);
              //////////////////////////////////////////
              doc.line(167, 122, 167, 246);
              doc.text('Per day', 169, 125);
              doc.line(167, 127, 202, 127);
              doc.text('Per Week', 169, 130);
              doc.line(167, 132, 202, 132);
              doc.text('Per Month', 169, 135);
              doc.line(167, 137, 202, 137);
              doc.text('Extra Day', 169, 140);
              doc.line(167, 142, 202, 142);
              doc.text('Per Km', 169, 145);
              doc.line(167, 147, 202, 147);
              doc.text('No. of Days', 169, 150);
              doc.line(167, 152, 202, 152);
              doc.text('CDW', 169, 155);
              doc.line(167, 157, 202, 157);
              doc.text('TP', 169, 160);
              doc.line(167, 162, 202, 162);
              doc.text('Fuel', 169, 165);
              doc.line(167, 167, 202, 167);
              doc.text('Driver’s', 169, 171);
              doc.text('Allowance', 169, 174,);
              doc.line(167, 177, 202, 177);
              doc.text('Sub-total', 169, 180);
              doc.line(167, 182, 202, 182);
              doc.text('16% VAT', 169, 185);
              doc.line(167, 187, 202, 187);
              doc.text('Total', 169, 190);
              doc.line(167, 192, 202, 192);
              doc.text('Discount', 169, 195);
              doc.line(167, 197, 202, 197);
              doc.text('Net Amount', 169, 201);
              doc.text('To Pay', 169, 205);
              doc.line(167, 207, 202, 207);
              doc.text('US $', 169, 210);
              doc.line(167, 212, 202, 212);





              /////////////////////////////////////////


              doc.rect(107, 246, 95, 46)

              doc.setFontSize(7.7);

              const paragraph6 = 'I the undersigned warrant the above particulars are true. I am renting the above vehicle in good condition and am liable to pay for any damage caused to this car. I fully understand that I am the only person authorised to drive this vehicle (unless otherwise specified above) and I undertake to return to this vehicle by not later than the date stated above. This rental is subject to the Company’s term and conditions as set out on the reverse of the customer copy of this agreement with conditions. I have read and agreed by my signature to accept as the conditions of this agreement with the company. Interest will be 3% per month on charge remaining unpaid after 30 days.'


              doc.text(paragraph6, 109, 250,
                {
                  maxWidth: 93
                }
              );
              doc.setFontSize(8);

              doc.setFont('helvatical', 'bold')

              doc.text('FINAL CHARGES SUBJECT TO AUDIT', 129, 277);
              doc.setFont('helvatical', 'normal');
              doc.text('FOR', 109, 285);
              doc.line(109, 282, 125, 282);
              doc.text('DATE', 109, 291);
              doc.line(109, 288, 125, 288)
              doc.text('Renter Signature', 159, 285);
              doc.line(159, 282, 199, 282)
              doc.text('Additional Driver’s Signature', 159, 291);
              doc.line(159, 288, 199, 288)

              doc.save('RA.pdf');

              // const pdfBlob = doc.output('blob');
              // const pdfUrl = URL.createObjectURL(pdfBlob);

              // Display in iframe
              // document.getElementById('pdfFrame2').src = pdfUrl;


            }






          }
          catch (error) {
            console.log('error RA', error)
          }

        }
      }
    })
    // const doc = new jsPDF({
    //   orientation: "p",
    //   unit: "mm",
    //   format: "a4",
    // });

    // Title


  }


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
        console.log('cdo data', this.fetchedCDOData)

      }

      if (this.fetchedCDOData.length > 0) {
        console.log('gyytgygh');


        for (const d of this.fetchedCDOData) {
          console.log('eric eric', d)
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

            const base64Img2 = 'data:image/png;base64,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';
            const base64Image1 = 'data:image/png;base64,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';
            const img2 = new Image();
            img2.src = base64Image1;
            const img = new Image();
            img.src = base64Img2;

            img.onload = function () {
              doc.addImage(img, 'png', 155, 3, 50, 30,); // Adjust position and size as needed
              doc.addImage(img2, 'png', 8, 3, 50, 30); // Adjust position and size as needed

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
              doc.text("JKIA (Airpor)", 202, 39, { align: "right" }, null);
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


              doc.text("Veh.Reg: " + d.vehicleRegNo, 81, 64);
              doc.text("Type: " + d.VehicleModel, 81, 73);
              doc.text("Pick-up location: " + d.PickupAddress, 81, 84);

              // doc.text("Pick-up location:", 81, 84);
              // doc.text(d.PickupAddress, 81, 75);

              // doc.line(110, 84, 130, 84);
              // doc.text("Pick-up time", 81, 93);
              // doc.text(d.PickupAddress, 81, 83);


              doc.text("CDO.PT_______________", 140, 55);
              doc.text(d.BookingNo + "/" + d.tripNumber, 155, 55);

              doc.text("Date In: ", 140, 64);
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
              doc.setFontSize(11);
              doc.text("SERVICE INSTRUCTIONS", 105, 110, { align: "center" }, null);
              doc.rect(10, 115, 190, 60); // Rectangle for Service Instructions
              const remarks = d.Remarks; // Replace with actual data
              const textHeight = 10; // Approximate height of text, adjust as necessary
              const rectangleHeight = 60;
              const verticalPadding = (rectangleHeight - textHeight) / 2;

              // Add remarks text centered horizontally and vertically
              doc.text(remarks, 105, 125 + verticalPadding, { align: "center" });

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

              doc.save("CDO for " + d.companyName + "-trip-" + d.TripNo + ".pdf");
            }
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







// getVehicleRegNo(vehicleModel: string) {
//   if (vehicleModel) {
//     this.apiService.assignVehicle(vehicleModel).subscribe((res) => {
//       this.fetchedVehicleList = res;
//     });
//   }

// }
// onVehicleChange(event: any) {
//   const vehicleID = event.target.value;
//   const vehicleRegNo = event.target.selectedOptions[0].getAttribute('data-regno').toString();
//   const FromDateTime = this.tripAssignmentForm.get('FromDateTime')?.value;
//   const ToDateTime = this.tripAssignmentForm.get('ToDateTime')?.value;

//   this.checkVehicleAssignment(vehicleID, vehicleRegNo, FromDateTime, ToDateTime);
// }







// checkVehicleAssignment(vehicleID: Number, vehicleRegNo: string, FromDateTime: any, ToDateTime: any) {
//   const vehicleDetails = {
//     vehicleID: Number(vehicleID),
//     vehicleRegNo: String(vehicleRegNo),
//     FromDateTime: moment(FromDateTime).format("YYYY-MM-DD HH:mm"),
//     ToDateTime: moment(ToDateTime).format("YYYY-MM-DD HH:mm"),
//   };

//   this.apiService.validateVehicle(vehicleDetails).subscribe((res) => {
//     if (res && res.length > 0) {
//       const confirmProceed = window.confirm(
//         `This Vehicle has already been assigned to TripNo: ${res[0].TripId}. Do you wish to proceed?`
//       );
//       if (!confirmProceed) {
//         this.vehicleAssignedError = "This vehicle is already assigned.";
//         this.isVehicleAssigned = false;
//       } else {
//         this.tripAssignmentForm.patchValue({
//           vehicleID: vehicleID,
//           vehicleRegNo: vehicleRegNo,
//           TripStatus: 'Scheduled'
//         });
//       }
//     } else {
//       // No conflict, proceed with assignment
//       this.tripAssignmentForm.patchValue({
//         vehicleID: vehicleID,
//         vehicleRegNo: vehicleRegNo,
//         TripStatus: 'Scheduled'
//       });
//     }

//     console.log('Vehicle assigned:', vehicleRegNo);
//   });
//   this.assignmentAllTrips()
// }