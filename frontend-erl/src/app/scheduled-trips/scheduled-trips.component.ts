import { Component, inject, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ApiService } from '../api.services';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { CommonModule,NgFor } from '@angular/common';
import { Router, RouterModule } from "@angular/router";


@Component({
  standalone:true,
  selector: 'app-scheduled-trips',
  templateUrl: './scheduled-trips.component.html',
  styleUrls: ['./scheduled-trips.component.css'],
  imports:[DataTablesModule,ReactiveFormsModule,CommonModule,NgFor,RouterModule]
})
export class ScheduledTripsComponent {
  trip: any;
  fetchedTripList: any;
  fetchedCDOData: any;
  tripFormUpdate: any;
  private modalService = inject(NgbModal);
  closeResult = "";
  assignmentData: any;
  reservationId: any;
  tripList: any;
  tripAssignmentData: any;
  getDismissReason: any;
  tripAssignmentForm: any;
  tripNumber: any;
  filteredReservations: any[] = [];
  scheduleSearchForm: FormGroup;
  TransactionId:any;

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
  AllTransactions:any
  dtOptions: DataTables.Settings = {};
  rentalAgreement: any;
  vehicleAssignedError: any;
  driverAssignedError: any;
  bookingStatusData: any;
  bookingCategoriesData: any;
  bookingBranchData:any;
  selectedTransaction:any;
  deliveryForm:any
  transactionList:any




  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private toastr: ToastrService,
    private actRoute: ActivatedRoute,
    private router: Router
  ) {
    this.assignmentData = [];
    this.assignmentAllTrips = [];
    this.AllTransactions=[]
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
    this.scheduleSearchForm = this.formBuilder.group({
      BookingNo: ["", Validators.required],
      BookingDate: ["", Validators.required],
      BookingCategory: ["", Validators.required],
      ToDateTime: ["", Validators.required],
      FromDateTime: ["", Validators.required],
      BookingStatus: ["InProgress", Validators.required],
      BookingType: ["", Validators.required],
      Branch: ["", Validators.required],
      vehicleMake: ["", Validators.required],
      VehicleId: ["", Validators.required],
    });
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
      vehicleRegistration: "",
      vehicleType: "",
      VehicleId: "",
      DriverId: "",
      DriverFirstName: "",
      BookingCategory: "",
      BookingFor:""
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
      TransactionId:['']

    });
    this.deliveryForm.patchValue({
      TripId: this.actRoute.snapshot.params["TripId"],
    });
  
  }
  

  ngOnInit() {
    this.apiService.getReservations().subscribe((reservations: any[]) => {
      this.filteredReservations = reservations.filter(
        (reservation) => reservation.BookingStatus === "Scheduled"
      );
      console.log("Filtered trips scheduled:", this.filteredReservations);
      this.assignmentData = [...this.filteredReservations];
    });
   
    this.fetchTransactions()

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
      order: [[10, "desc"]],
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

 
  }




  fetchTransactions(){
    this.AllTransactions = [];
    this.apiService.fetchAllTransactions().subscribe((res:any)=>{
      console.log(res,'the  vehicleouts/in')
  
  
  
  for(const t of res){
  this.AllTransactions.push(t)
  }
      })





  }
 



  filteredAssignment(filteredAssignment: any) {
    throw new Error('Method not implemented.');
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
          DropAddress: d.DropAddress,
          VehicleMake: d.VehicleMake,
          VehicleModel: d.VehicleModel,
          BookingNo: d.BookingNo,
          ReservationId: d.ReservationId,
          tripNumber: d.tripNumber,
          TripId: d.TripId,
          BookingCategory: d.BookingCategory,
          VehicleId: d.VehicleId,
          DriverId: d.DriverId,
          DriverFirstName: d.DriverFirstName,
          BookingFor:d.BookingFor,
        });

        console.log(d.DriverFirstName, "driverr patched");
        this.fetchModels(d.VehicleMake);
        this.fetchVehiclesByModel(d.VehicleModel);

        // console.log(d,ve)
           // this.BookingCategory = 'ChaufferDriven'; 
    // this.BookingCategory = 'SelfDriven'; 
      }
     
    });

    }

    getallTripss() {
      this.assignmentAllTrips = [];
      this.apiService.fetchAllTrips().subscribe((trips: any[]) => {
        for (const m of trips) {
          if (m.Transaction !== null) {  
            this.assignmentAllTrips.push(m);
          }
        }
        console.log(this.assignmentAllTrips, "Scheduled trips");
      });
    }
    getallTrips() {
      this.AllTransactions = [];
      this.apiService.fetchAllTrips().subscribe((trips: any[]) => {
        for (const m of trips) {
          if (m.Transaction !== null) {  
            this.AllTransactions.push(m);
          }
        }
        console.log(this.AllTransactions, "Scheduled trips");
      });
    }
    


    editTripAssignment(TripId: any) {
      console.log(TripId, "friday");
      this.tripAssignmentList = [];
  
      JSON.stringify(this.tripAssignmentForm.value);
  
      console.log(this.tripAssignmentForm.value, ".......trip assignment");
  
      this.apiService
        .editTrip(TripId, this.tripAssignmentForm.value)
        .subscribe(() => {
          console.log(this.tripAssignmentForm.value, ".......trip ass");
          // this.getRelatedTrips(this.tripAssignmentForm.value.ReservationId)
        });
        console.log('ovcwyey');
        this.getallTrips()
    }
    
  openEditAssignment(editAssignment: any) {
    console.log("hhhhhhhhhhhhhhhhhhhhhhhhheeeeeeeeeeeeeeeeeey");

    this.modalService.open(editAssignment, { size: "lg" }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }
  fetchModels(VehicleMake: any) {
    throw new Error('Method not implemented.');
  }
  fetchVehiclesByModel(VehicleModel: any) {
    throw new Error('Method not implemented.');
  }

  searchScheduled(){
    this.filteredReservations = [];
      console.log(this.scheduleSearchForm.value, 'form schedules values');

    this.apiService.searchAss(this.scheduleSearchForm.value).subscribe(
      (res: any[]) => {
        this.filteredReservations = res;
        console.log(res,'these are my scheduled results',res)
      },
      (error) => {
      }
    );
  }

  vehicleMovement(TransactionId: any) {
    console.log('TransactionId', TransactionId)
    this.transactionList=[]
    this.apiService.fetchTransactionsById(TransactionId).subscribe((res:any) => {
      console.log('TransactionIdRESPONSE', res)
        this.deliveryForm.patchValue({
          BookingNo: res.BookingNo,
          tripNumber: res.tripNumber,
          BookingFor: res.BookingFor,
          PickupContactNo: res.PickupContactNo,
          PickupEmail: res.PickupEmail,
          VehicleModel: res.VehicleModel,
          VehicleMake: res.VehicleMake,
          vehicleRegNo: res.vehicleRegNo,
          BookingDate: res.BookingDate,
          PickupAddress: res.PickupAddress,
          DriverFirstName: res.DriverFirstName,
          FromDate: res.FromDate,
          FromTime: res.FromTime,
          vehicleIN: res.vehicleIN,
          vehicleOUT: res.vehicleOUT,
          TripId:res.TripId,
          TransactionId:res.TransactionId
        })
        console.log('Response', this.deliveryForm.value)
      })

  }


  completeTrip(TransactionId: any) {
    console.log('completeTrip', TransactionId);
    
    // Fetch the transaction by ID
    this.apiService.fetchTransactionsById(TransactionId).subscribe((res: any) => {
      console.log('Fetched Transaction:', res);
  
      // Patch the form with the response (res)
      this.deliveryForm.patchValue({
        // BookingNo: res.BookingNo,
        // tripNumber: res.tripNumber,
        // BookingFor: res.BookingFor,
        // PickupContactNo: res.PickupContactNo,
        // PickupEmail: res.PickupEmail,
        // VehicleModel: res.VehicleModel,
        // VehicleMake: res.VehicleMake,
        // vehicleRegNo: res.vehicleRegNo,
        // BookingDate: res.BookingDate,
        // PickupAddress: res.PickupAddress,
        // DriverFirstName: res.DriverFirstName,
        // FromDate: res.FromDate,
        // FromTime: res.FromTime,
        // vehicleIN: res.vehicleIN,
        // vehicleOUT: res.vehicleOUT,
        TripId: res.TripId,
        TransactionId: res.TransactionId,
        FuelIN:res.FuelIN,
        FuelOUT:res.FuelOUT,
        MileageOUT:res.MileageOUT,
        MileageIN:res.MileageIN
      });
  
      console.log('Updated Form Data:', this.deliveryForm.value);
  
      this.apiService.updateTransactions(TransactionId, this.deliveryForm.value).subscribe((updateRes: any) => {
        console.log('Update Transaction Response:', updateRes);
  
        this.AllTransactions.push(updateRes);
      });
    });
  }
  

  completeTrip2(TransactionId:any) {
    console.log('completestrip',TransactionId)
    this.apiService.fetchTransactionsById(TransactionId).subscribe((res)=>{
console.log(res,'second')   
 })
    console.log("TrIPFinish", this.deliveryForm.value)
    this.apiService.updateTransactions(TransactionId,this.deliveryForm).subscribe((res) => {
      console.log('TripFinihResponse', res)
      this.AllTransactions.push(res)
    })

this.toastr.success()
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
}
