import { Component, inject, Input, TemplateRef, ViewChild, ElementRef, Renderer2 } from "@angular/core";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { MatTableModule } from "@angular/material/table";
import { CommonModule, NgFor } from "@angular/common";
import { Router } from '@angular/router';
import { COUNTRIES_WITH_CODES } from "src/app/countries";

import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from "@angular/forms";
// import { ApiService } from "src/app/api.services-old";
import { ReactiveFormsModule } from "@angular/forms";
import { ApiService } from "src/app/api.services";
import { MatIconModule } from "@angular/material/icon";
import * as moment from "moment";


import {
  NgbAlertModule,
  NgbDatepickerModule,
} from "@ng-bootstrap/ng-bootstrap";

import { ToastrService } from "ngx-toastr";
import { ActivatedRoute } from "@angular/router";
import { HttpEventType } from "@angular/common/http";

@Component({
  standalone: true,
  selector: "app-booking-details",
  templateUrl: "./booking-details.component.html",
  styleUrls: ["./booking-details.component.css"],
  imports: [
    MatTableModule,
    CommonModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule,
    NgFor,
    NgbDatepickerModule,
    NgbAlertModule,

  ],
})
export class BookingDetailsComponent {
  currentStep: number = 1;
  vehicleRegistrationList: any;
  vehicleForm: FormGroup | undefined;
  dataToExport: any;


  countries = [
    { name: 'United States' },
    { name: 'Canada' },
    { name: 'United Kingdom' },
  ];

  private modalService = inject(NgbModal);
  @Input() showOption: string = "";
  @ViewChild('rentalAgreement')
  rentalAgreement: any = ElementRef<any>;

  closeResult = "";
  booking: any;
  addTrip: any;
  tripData: any;
  Details: any;
  editDriver: any;
  driverForm: FormGroup;
  tripForm: FormGroup;
  tripServicesForm: FormGroup;
  bookingForm: FormGroup;
  bookingFormEdit: FormGroup;
  tripServicesData: any;
  reservationId: any;
  tripId: any;
  reservation: any;
  viewbookingDetails: any;
  BookingNo: any;
  BookingDate: any;
  BookingCategory: any;
  BookingType: any;
  Branch: any;
  BookingStatus: any;
  reservationData: any = [];
  BookingData: any;
  driverData: any;
  types: any;
  selectedStatus: any = "";
  ReservationId: any;
  TripId: any;
  BookingDriverId: any;
  x: any;
  tripNumber = 0;
  model: any;
  tripIncidentsForm: FormGroup;
  incidentDate: any;
  tripIncidentsData: any;
  tripList: any;
  tripFuelLevel: any;
  tripStatusList: any;
  category_Options: string = "";

  driverServiceStatusList: any;
  bookingCategoriesData: any;
  selectedOption: any;

  bookingTypesData: any;
  bookingBranchData: any;
  bookingStatusData: any;
  bookingSourceData: any;
  // categoryChosen: any;
  // categoryChosen:string;
  companiesData: any;
  bookingChargeData: any;
  tripIncidentsList: any;
  serviceStatusList: any;
  // vehicleRegistrationList: any;
  tripIncidentsTypeList: any;
  serviceNameList: any;
  fetchedTripList: any;
  tripReservationList: any;
  fetchedReservationList: any;
  fetchedServicesList: any;
  vehicleModelList: any;
  vehicleMakeList: any;
  tripFormUpdate: any;
  vehicleTypeList: any;
  tripServicesList: any;
  fetchedDriverList: any;
  fetchedChaufferDriverList: any;
  driverFormUpdate: FormGroup;
  tripServicesFormUpdate: FormGroup;
  sageServiceInfoList: any;
  reservationinfo: any;
  DriverList: any;
  isShow = false;
  rentalAgreementForm: FormGroup;
  rentalAgreementList: any;
  DriversNameList: any;

  nativeElement: any;
  ServiceQuantity: any[];
  countryCodes: string[] = ['+1 (USA)',
    '+44 (UK)',
    '+91 (India)',
    '+254 (Kenya)',
    '+81 (Japan)',
    '+33 (France)',
    '+49 (Germany)',
    '+61 (Australia)',
    '+39 (Italy)',
    '+55 (Brazil)',
    '+7 (Russia)',
    '+27 (South Africa)',
    '+20 (Egypt)',
    '+86 (China)',
    '+27 (South Africa)',
    '+60 (Malaysia)',
    '+63 (Philippines)',
    '+64 (New Zealand)',
    '+34 (Spain)',
    '+31 (Netherlands)']; 

  selectedFile: File | null = null;
  uploadProgress: number | null = null;
  http: any;
  showAddressLine2 = false;
  showAddressLine3 = false;
  showServicesInTrips: boolean = false;
  rest: any;
  resvList: any;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private toastr: ToastrService,
    private actRoute: ActivatedRoute,
    private router: Router,
    private readonly renderer: Renderer2,
  ) {
    this.DriverList = [];
    this.resvList=[];
    this.BookingData = [];
    this.BookingCategory = [];
    this.companiesData = [];
    this.reservationinfo = [];
    this.tripIncidentsData = [];
    this.bookingCategoriesData = [];
    this.bookingTypesData = [];
    this.bookingChargeData = [];
    this.bookingSourceData = [];
    this.bookingBranchData = [];
    this.bookingStatusData = [];
    this.serviceStatusList = [];
    this.tripIncidentsList = [];
    this.tripIncidentsTypeList = [];
    this.vehicleRegistrationList = [];
    this.vehicleMakeList = [];
    this.serviceNameList = [];
    this.tripFuelLevel = [];
    this.vehicleModelList = [];
    this.vehicleTypeList = []
    this.tripData = [];
    this.sageServiceInfoList = [];
    this.DriversNameList = [];

    this.tripForm = this.formBuilder.group({
      DriverServiceStatus: ["InProgress", Validators.required],
      TripStatus: "InProgress",
      // VehicleMarks: "",
      FromDateTime: "",
      ToDateTime: "",
      ArrivalFlightDateTime: "",
      DepartureFlightDateTime: "",
      Airline: "",
      PickupAddress: "",
      PickupContactNo: "",
      PickupFirstName: '',
      PickupLastName: '',
      PickupName: '',
      FirstName: "",
      LastName: "",
      PickupEmail: "",
      DropAddress: "",
      MileageIN: "",
      tripFuelLevel: "",
      MileageOUT: "",
      FuelIN: "",
      FuelOUT: "",
      ReservationId: "",
      tripNumber: "",
      VehicleMake: "",
      VehicleModel: "",
      vehicleRegistration: "",
      vehicleType: "",
      Remarks: "",
      DepartureFlightNo: "",
      ArrivalFlightNo: "",
      BookingNo:""


    });

    this.tripFormUpdate = this.formBuilder.group({
      DriverServiceStatus: "",
      TripStatus: "",
      // VehicleMarks: "",
      FromDateTime: "",
      ToDateTime: "",
      FlightNo: "",
      FlightDateTime: "",
      Airline: "",
      PickupAddress: "",
      PickupContactNo: "",
      PickupEmail: "",
      DropAddress: "",
      ReservationId: "",
      tripNumber: "",
      TripId: "",
      VehicleMake: "",
      VehicleModel: "",
      vehicleRegistration: "",
      vehicleType: "",
      Remarks: "",
      ArrivalFlightNo: "",
      DepartureFlightNo: "",
      BookingNo: ""
    });

    this.tripServicesFormUpdate = this.formBuilder.group({
      ServiceCode: "",
      TripCharge: "",
      quantity: "",
      TripServiceStatus: "",
      ReservationId: "",
      TripId: "",
      tripNumber: "",
      tripType: "",
      serviceName: "",
      ServiceId: "",
      Stocklink: "",
    });

    this.bookingForm = this.formBuilder.group({
      BookingNo: ["", Validators.required],
      BookingDate: ["", Validators.required],
      BookingCategory: ["", Validators.required],
      BookingType: ["", Validators.required],
      Branch: ["", Validators.required],
      BookingStatus: ["", Validators.required],
      BookingFor: ["", Validators.required],
      Source: ["", Validators.required],
      SourceRef: ["", Validators.required],

      TotalAmount: ["", Validators.required],
      TotalPaid: ["", Validators.required],
      ExchangeRate: ["", Validators.required],
      ContractId: ["", Validators.required],

      CompanyCode: ["", Validators.required],
      PayeeCompanyName: ["", Validators.required],
      Remarks: ["", Validators.required],
    });

  
 


    this.bookingFormEdit = this.formBuilder.group({
      BookingNo: ["", Validators.required],
      BookingDate: ["", Validators.required],
      BookingCategory: ["", Validators.required],
      BookingType: ["", Validators.required],
      Branch: ["", Validators.required],
      BookingStatus: ["", Validators.required],
      BookingFor: ["", Validators.required],
      Source: ["", Validators.required],
      SourceRefNo: ["", Validators.required],

      TotalAmount: ["", Validators.required],
      TotalPaid: ["", Validators.required],
      ExchangeRate: ["", Validators.required],
      ContractId: ["", Validators.required],

      CompanyCode: ["", Validators.required],
      PayeeCompanyName: ["", Validators.required],
      Remarks: ["", Validators.required],
    });

    this.tripForm.patchValue({
      ReservationId: this.actRoute.snapshot.params["ReservationId"],
    });




    //  this.driverForm.patchValue({
    //    ReservationId: this.actRoute.snapshot.params["ReservationId"],
    //  });

    // this.tripServicesForm.patchValue({
    //   ReservationId: this.actRoute.snapshot.params["ReservationId"],
    // });


    this.tripServicesData = [];
    this.tripServicesForm = this.formBuilder.group({
      serviceCode: "",
      quantity: "1",
      TripCharge: "",
      TripServiceStatus: "InProgress",
      ReservationId: "",
      TripId: "",
      tripType: "",
      serviceName: "",
      tripNumber: "",
      Stocklink: "",
      BookingNo:""
      
    });


    this.ServiceQuantity = []

    for (let i = 1; i <= 28; i++) {
      this.ServiceQuantity.push(i);
    }
    this.BookingData = [];
    this.tripFuelLevel = [];
    this.tripList = [];
    this.tripReservationList = [];
    this.driverServiceStatusList = [];
    this.tripStatusList = [];
    this.tripIncidentsList = [];
    this.fetchedTripList = [];
    this.fetchedReservationList = [];
    this.fetchedServicesList = [];
    this.rentalAgreementList = [];

    this.fetchedDriverList = [];
    this.fetchedChaufferDriverList = [];

    this.tripIncidentsForm = this.formBuilder.group({
      IncidentType: [""],
      IncidentRemarks: [""],
      ReportedBy: [""],
      DriverName: [""],
      IncidentDateTime: [""],
      Disposition: [""],
      TripId: [""],
      ReservationId: [""],
    });

    this.driverData = [];
    this.tripServicesList = [];
    this.tripServicesForm.patchValue({
      ReservationId: this.actRoute.snapshot.params["ReservationId"],
    });
    this.tripIncidentsForm.patchValue({
      ReservationId: this.actRoute.snapshot.params["ReservationId"],
      
    });

    
   
    this.driverForm = this.formBuilder.group({
      DriverFirstName: ["", Validators.required],
      // DriverLastName: ["", Validators.required],
      DriverDOB: ["", Validators.required],
      DriverLicenseNo: ["", Validators.required],
      DriverLicenseIssue: ["", Validators.required],
      DriverLicenseExpiry: ["", Validators.required],
      Nationality: ["", Validators.required],
      IDPP: ["", Validators.required],
      IDPPExpiry: ["", Validators.required],
      CountryOfIssue: ["", Validators.required],
      CountryOfResidence: ["", Validators.required],
      AddressLine1: ["", Validators.required],
      AddressLine2: ["", Validators.required],
      AddressLine3: ["", Validators.required],
      ContactNo: ["", Validators.required],
      Email: ["", Validators.required],
      NextOfKinName: ["", Validators.required],
      NextOfKinContactNo: ["", Validators.required],
      BookingRemarks: ["", Validators.required],
      ReservationId: "",
    });
    

    this.driverFormUpdate = this.formBuilder.group({
      DriverFirstName: [""],
      DriverLastName: [""],
      DriverDOB: [""],
      DriverLicenseNo: [""],
      DriverLicenseIssue: [""],
      DriverLicenseExpiry: [""],
      Nationality: [""],
      IDPP: [""],
      IDPPExpiry: [""],
      CountryOfIssue: [""],
      CountryOfResidence: [""],
      AddressLine1: [""],
      AddressLine2: [""],
      AddressLine3: [""],
      ContactNo: [""],
      Email: [""],
      NextOfKinName: [""],
      NextOfKinContactNo: [""],
      BookingRemarks: [""],
      ReservationId: "",
      BookingDriverId: "",
    });

    this.driverForm.patchValue({
      ReservationId: this.actRoute.snapshot.params["ReservationId"],
    });

    this.rentalAgreementForm = this.formBuilder.group({
      DriverFirstName: '',
      DriverLastName: '',
      ContactNo: '',
      Email: '',
      AddressLine1: '',
      DriverLicenseNo: '',
      DriverLicenseIssue: '',
      DriverLicenseExpiry: '',
      CountryOfResidence: '',
      DriverDOB: '',
      IDPP: '',
      CountryOfIssue: '',
      PickupAddress: '',
      BookingNo: '',
      vehicleRegNo: '',
      VehicleModel: '',
      FromDateTime: '',
      DropAddress: '',
      ToDateTime: '',

    })
  }


  ngOnInit() {



    this.tripForm.get('VehicleModel')?.valueChanges.subscribe((model) => {
      if (model) {
        this.fetchVehicleTypes(model);
      }
    });
  

    this.apiService.getBookingCategories().subscribe((categories: any) => {
      for (const a of categories) {
        this.bookingCategoriesData.push(a);
      }
      console.log('categories', categories)
    });
    this.apiService.getBookingTypes().subscribe((BookingType: any) => {
      for (const b of BookingType) {
        this.bookingTypesData.push(b);
        console.log(this.bookingTypesData, "bookingTypesData");
      }
      console.log(this.types, "bookingTypesData");
    });

    this.apiService.getCompanies().subscribe((company: any) => {
      for (const c of company) {
        this.companiesData.push(c);
      }
    });

    this.apiService.getBookingStatus().subscribe((status: any) => {
      for (const d of status) {
        this.bookingStatusData.push(d);
      }
    });

    this.apiService.getBookingSource().subscribe((source: any) => {
      for (const e of source) {
        this.bookingSourceData.push(e);
      }
    });

    this.apiService.getBookingBranch().subscribe((branch: any) => {
      for (const f of branch) {
        this.bookingBranchData.push(f);
      }
    });

    this.apiService.getBookingCharge().subscribe((charge: any) => {
      for (const g of charge) {
        this.bookingChargeData.push(g);
      }
    });



    this.reservationId = this.actRoute.snapshot.params["ReservationId"];

    this.apiService
      .getReservationsById(this.reservationId)
      .subscribe((reservationsInfo) => {
        for (const x of reservationsInfo) {
          this.BookingData.push(x);
        }
for( const d of this.BookingData){
  this.tripForm.patchValue({
    BookingNo:d.BookingNo
  })

}
        console.log(this.BookingData, "bookingData");
      });
    this.apiService.getVehicleRegistration().subscribe((vehicleReg) => {
      for (const f of vehicleReg) {
        this.vehicleRegistrationList.push(f);
      }
    });

    this.apiService.getVehicleMake().subscribe((VehicleMake) => {
      for (const j of VehicleMake) {
        this.vehicleMakeList.push(j);
        console.log("vehivle makes");
      }
      // console.log(vehicleMake, "vvvvvvv");
    });

    // this.apiService
    //   .getRelatedTrip(this.reservationId)
    //   .subscribe((tripNumbers: any) => {
    //     for (const a of tripNumbers) {
    //       this.tripList.push(a);
    //     }
    //     // console.log(this.tripList,'.....................')
    //   });

    this.apiService.getFuelLevel().subscribe((fuelLevel) => {
      for (const b of fuelLevel) {
        this.tripFuelLevel.push(b);
      }
      // console.log(this.tripFuelLevel, ".....................");
    });
    this.apiService
      .getDriverServiceStatus()
      .subscribe((driverServiceStatus) => {
        for (const c of driverServiceStatus) {
          this.driverServiceStatusList.push(c);
        }
        // console.log(this.driverServiceStatusList, ".....................");
      });
    this.apiService.getTripStatus().subscribe((tripStatus) => {
      for (const d of tripStatus) {
        this.tripStatusList.push(d);
      }
      // console.log(this.tripStatusList, ".....................");
    });
    this.apiService.getIncidentsType().subscribe((Incident) => {
      for (const h of Incident) {
        this.tripIncidentsTypeList.push(h);
      }
      // console.log("NNNNNNN", Incident);
    });
    this.apiService.fetchAllChauffers().subscribe((chauffers) => {
      for (const y of chauffers) {
        this.fetchedChaufferDriverList.push(y)
      }
    })


    this.apiService.getServiceStatus().subscribe((serviceStatus) => {
      for (const m of serviceStatus) {
        this.serviceStatusList.push(m);
      }
      // console.log(this.serviceStatusList, "tripservice");
    });

    this.apiService.getServiceName().subscribe((serviceName) => {
      for (const k of serviceName) {
        this.serviceNameList.push(k);
        // console.log('hhhhh',this.serviceNameList.Description_1)
      }
      // console.log('hhhhh',this.serviceNameList)
    });

    this.fetchRelatedTripServices(this.reservationId);

    //call trip incidents

    this.fetchRelatedTripIncidents(this.reservationId);

    //call trips
    this.fetchRelatedReservationTrips(this.reservationId);

    this.fetchRelatedDrivers(this.reservationId);
 
 
 
  }



  fetchVehicleTypes(model: string): void {
    this.apiService.getVehicleType(model).subscribe((vehicleTypes) => {
      console.log('VehicleType',vehicleTypes)
      this.vehicleTypeList = vehicleTypes;
      if (vehicleTypes.length > 0) {
        this.tripForm.patchValue({ vehicleType: vehicleTypes[0].category_Options_2 });
      } else {
        // Optionally clear the vehicleType field if no types are found
        this.tripForm.patchValue({ vehicleType: null });
      }
  
    });
  }
 


  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLElement;
    fileInput.click();
  }


  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.uploadFile()
  }

  uploadFile() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);




      this.http.post('/api/photos/upload', formData).subscribe((response: any) => {
        console.log('Upload successful:', response);

      })

      error: (error: any) => {
        console.error('Upload failed:', error);
      }
    }
  }







  addAdditionalAddress() {
    if (!this.showAddressLine2) {
      this.showAddressLine2 = true;
    } else if (!this.showAddressLine3) {
      this.showAddressLine3 = true;
    }
  }












  addCountryCode(event: any) {
    const value = event.target.value;
    const countryCode = this.countryCodes.find(code => value.startsWith(code));
    if (countryCode) {
      this.tripForm.patchValue({
        PickupContactNo: countryCode + value.replace(countryCode, '')
      });
    }
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
  navigateTo(page: string) {
    this.router.navigate([page]);
    console.log('navigationss', page)
  }
  fetchModels(VehicleMake: any) {

    this.apiService.getVehicleModel(VehicleMake).subscribe((VehicleModel) => {
      this.vehicleModelList = [];
      for (const g of VehicleModel) {
        this.vehicleModelList.push(g);
      }
      console.log(VehicleMake, "eric");
    });
  }
  fetchTypes(VehicleModel: any) {

    this.apiService.getVehicleType(VehicleModel).subscribe((vehicleType) => {
      this.vehicleModelList = [];
      for (const g of vehicleType) {
        this.vehicleTypeList.push(g);
      }
      console.log(vehicleType, "vehicleType");
    });
  }


  fetchVehiclesByModel(Model: any) {
    this.vehicleModelList = [];
    this.apiService.getVehicleByModel(Model).subscribe((vehicleModel) => {
      for (const ve of vehicleModel) {
        this.vehicleModelList.push(ve);
      }

      console.log(this.vehicleModelList, "fetched");
    });
  }
 

  viewReservationDoc() {
    this.apiService.getDocuments(this.reservationId).subscribe((reservation) => {
      this.rentalAgreementForm
    });
  }



  saveTripService() {
    JSON.stringify(
      this.tripServicesForm.value,
      this.ReservationId,
      this.TripId,
    );
    const { BookingNo, ...newres } =this.tripServicesForm.value ;
    this.apiService.addTripService(newres).subscribe((res) => {
      this.tripServicesList.push(res)
      console.log(res,'tripservice res')
    })
    this.toastr.success("Service Added Successfully");
    this.fetchRelatedTripServices(this.reservationId)
  }

  //-------edit trip service-------//
  editTripServicesDetails(serviceId: number) {
    JSON.stringify(this.tripServicesFormUpdate.value);
    this.apiService
      .editTripService(serviceId, this.tripServicesFormUpdate.value)
      .subscribe(() => {
        this.fetchRelatedTripServices(this.reservationId);
        this.toastr.success("tripService updated");
      });
  }

  //------- trip service info-------//
  // add
  fetchServiceInfo1(serviceName: string) {
    this.sageServiceInfoList = [];
    console.log(serviceName);
    this.apiService.fetchSageServices(this.reservationId).subscribe((serviceInfo) => {
      this.sageServiceInfoList = serviceInfo;

      const selectedService = this.sageServiceInfoList.find((service: { serviceDesc: string; }) => service.serviceDesc === serviceName);

      if (selectedService) {
        this.tripServicesForm.patchValue({
          serviceCode: selectedService.Code,
        });
      }
      console.log(this.sageServiceInfoList);
    });
  }

  // edit
  fetchServiceInfo2(serviceName: any) {
    this.sageServiceInfoList = [];
    console.log(serviceName);
    this.apiService.getServiceSageInfo(serviceName).subscribe((serviceinfo) => {
      this.sageServiceInfoList.push(serviceinfo);

      for (const r of serviceinfo) {
        this.tripServicesFormUpdate.patchValue({
          // TripCharge: r.AverageCost,
          ServiceCode: r.Code,
        });
      }
      console.log(this.sageServiceInfoList);
    });
  }

  //------- fetch trip services-------
  fetchRelatedTripServiceInfo(serviceId: any) {
    // console.log(TripId, "tripservices");

    this.fetchedServicesList = [];

    this.apiService
      .getRelatedTripServiceInfo(serviceId)
      .subscribe((serviceName) => {
        this.fetchedServicesList.push(serviceName);
        for (const dd of serviceName) {
          console.log(dd.ServiceId);
          this.tripServicesFormUpdate.patchValue({
            ServiceCode: dd.ServiceCode,
            TripCharge: dd.TripCharge,
            TripServiceStatus: dd.TripServiceStatus,
            ReservationId: dd.ReservationId,
            TripId: dd.TripId,
            tripType: dd.tripType,
            serviceName: dd.serviceName,
            ServiceId: dd.ServiceId,
          });
          this.fetchServiceInfo2(dd.serviceName);
        }
      });
    // console.log(this.tripServicesFormUpdate, "serviceNameyuogb3");
  }

  //------- fetch related trip services-------
  fetchRelatedTripServices(reservationId: any) {
    this.tripServicesList = [];
    this.apiService
      .getRelatedTripServices(reservationId)
      .subscribe((tripServices) => {
        for (const z of tripServices) {
          this.tripServicesList.push(z);
        }
        // console.log(this.tripServicesList);
      });
  }

  saveTripIncidents() {
    JSON.stringify(this.tripIncidentsForm.value);
    console.log("trip incidents", this.tripIncidentsForm.value);
    this.apiService
      .addTripIncident(this.tripIncidentsForm.value)
      .subscribe(() => {
        this.tripIncidentsData.push(this.tripIncidentsForm.value);

        this.fetchRelatedTripIncidents(this.reservationId);

        this.toastr.success("Incident Added Successfully");
      });
    // console.log("trip incidents", this.tripIncidentsForm.value);
  }

  EditTripIncidents() { }

  editBooking() {
    JSON.stringify(this.bookingForm.value);
    this.apiService
      .editReservations(this.bookingForm.value)
      .subscribe((response: any) => {
        console.log("successfully edited", response);
      });
  }
  fetchBooking(ReservationId: any) {

    this.fetchedReservationList = [];
    this.apiService.fetchReservation(ReservationId).subscribe((res) => {
      console.log('resposne', res)
      // for (const y of res) {
      // this.fetchedReservationList.push(y)
      // }

      for (const f of res) {
        this.bookingFormEdit.patchValue({
          BookingNo: f.BookingNo,
          BookingDate: moment(f.BookingDate).format("YYYY-MM-DD"),
          BookingCategory: f.BookingCategory,
          BookingType: f.BookingType,
          Branch: f.Branch,
          BookingStatus: f.BookingStatus,
          BookingFor: f.BookingFor,
          Source: f.Source,
          SourceRefNo: f.SourceRefNo,
          TotalAmount: f.TotalAmount,
          TotalPaid: f.TotalPaid,
          ExchangeRate: f.ExchangeRate,
          ContractId: f.ContractId,
          CompanyCode: f.CompanyCode,
          PayeeCompanyName: f.PayeeCompanyName,
          Remarks: f.Remarks,


        })
      }
    })
  }





  addTripModal(addTrip: any) {
    this.modalService.open(addTrip, { size: "lg" }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }
  viewBookings(Details: any) {
    this.modalService.open(Details, { size: "lg" }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }
  openDriver(editDriver: any) {
    this.modalService.open(editDriver, { size: "lg" }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  // -------------------------------------Reservation Trip-------------------------------------

 
  fetchTrip(TripId: any) {
    this.fetchedTripList = []
    this.apiService.fetchTrips(TripId).subscribe((res) => {
      console.log('MY FETCHED TRIPS', res)
      for (const z of res) {
        this.fetchedTripList.push(z);
      }
      for (const d of this.fetchedTripList) {
        this.tripFormUpdate.patchValue({
          DriverServiceStatus: d.DriverServiceStatus,
          TripStatus: d.TripStatus,
          VehicleMarks: d.VehicleMarks,
          FromDateTime: moment(d.FromDateTime).format("YYYY-MM-DD HH:mm"),
          ToDateTime: moment(d.ToDateTime).format("YYYY-MM-DD HH:mm"),
          FlightNo: d.FlightNo,
          FlightDateTime: moment(d.FlightDateTime).format(
            "YYYY-MM-DD HH:mm"
          ),
          Airline: d.Airline,
          PickupAddress: d.PickupAddress,
          PickupContactNo: d.PickupContactNo,
          PickupEmail: d.PickupEmail,
          DropAddress: d.DropAddress,
          VehicleMake: d.VehicleMake,
          VehicleModel: d.VehicleModel,
          vehicleType: d.vehicleType,
          ReservationId: d.ReservationId,
          tripNumber: d.tripNumber,
          TripId: d.TripId,
          BookingNo: d.BookingNo

        })
        this.fetchModels(d.VehicleMake);
        this.fetchVehiclesByModel(d.VehicleModel);
      }
    })


  }


  copyTrip(tripId: any) {
    console.log(tripId, 'CopyTripsClicked');
  
    const userConfirmed = window.confirm('This action copies the Trip. Do you wish to proceed?');
    if (userConfirmed) {
      this.apiService.getOneTrip(tripId).subscribe((res: any) => {
        console.log(res, "First response");
  
        // Create a new object without the TripId
        const { TripId,vehicleRegNo, ...tripWithoutId } = res;
        console.log(tripWithoutId, "Modified response");
  
        this.apiService.addTrip(tripWithoutId).subscribe((response) => {
          this.tripData=(response);
          this.fetchRelatedReservationTrips(this.reservationId);
          console.log(response, "Copied response");
        });
      });
    }
  }


fetchTripSId(TripId:any){
console.log('fetchTripID',TripId)
this.apiService.getOneTrip(TripId).subscribe((res:any)=>{
  for(const g of res){
    this.tripServicesForm.patchValue({
      TripId:g.TripId,
      tripNumber:g.tripNumber
    })
  }
})
}





  fetchRelatedTrips(reservationId: any) {
    this.tripList = [];
    this.apiService
      .getRelatedTrip(reservationId)
      .subscribe((tripNumbers: any) => {
        for (const a of tripNumbers) {
          this.tripList.push(a);
        }
        console.log(this.tripList, "........tripList.............");
      });
  }



  fetchRelatedReservationTrips(reservationId: any) {
    this.tripReservationList = [];
    console.log('ReservationList', this.tripReservationList)
    this.apiService
      .getRelatedReservationTrip(reservationId)
      .subscribe((tripNumbers: any) => {
        for (const a of tripNumbers) {
          this.tripReservationList.push(a);
        }
for(const dd of this.tripReservationList ){
  this.tripServicesForm.patchValue({
    tripNumber:dd.tripNumber,
    TripId:dd.TripId,
    reservationId:dd.reservationId,
    BookingNo:dd.BookingNo
    
  })
}
        console.log(this.tripReservationList, "....ffffffffffff");
      });
  }

getTrips(reservationId:any){
  this.tripList=[];
  console.log('ReservationList', this.tripList)

  this.apiService.getRelatedReservationTrip(reservationId).subscribe((res)=>{
    for( const s of res){
      this.tripList.push(s)

    }
  })

}




  saveTrip() {
    console.log('eric');
    JSON.stringify(this.tripForm.value, this.ReservationId, this.tripNumber);
    console.log("string for strinfied", this.tripForm.value, this.tripNumber);
    this.apiService.addTrip(this.tripForm.value).subscribe(() => {
      console.log("string for response", this.tripForm.value);


      // const confirmServices= window.confirm('Do you wish to add TripServices?')
      // if(confirmServices){
      this.showServicesInTrips = true;

      //   console.log('TripId',this.TripId)
      // }


      this.tripData.push(this.tripForm.value);


      this.fetchRelatedReservationTrips(this.reservationId);


      this.toastr.success("Trip Added Successfully");

    });
    this.tripForm.reset()
  }



  editTripDetails(TripId: any) {
    console.log(TripId);
    JSON.stringify(this.tripFormUpdate.value);
    console.log(this.tripFormUpdate.value);
    this.apiService
      .editTrip(TripId, this.tripFormUpdate.value)
      .subscribe(() => {
        // console.log("trips", this.tripFormUpdate.value);
        this.fetchRelatedTrips(this.reservationId);
        this.toastr.success("trip updated successfully");
      });
  }

  // -------------------------Self Drivers-------------------------

  editDriverDetails(BookingDriverId: any) {
    console.log(BookingDriverId, "claire is a hater");
    JSON.stringify(
      this.driverFormUpdate.value,
      BookingDriverId,
      this.reservationId
    );
    this.apiService
      .editDrivers(BookingDriverId, this.driverFormUpdate.value)
      .subscribe(() => {
        this.fetchRelatedDrivers(this.reservationId);
        this.toastr.success("Driver updated successfully");
        // console.log(this.driverFormUpdate.value, "vjygvv");
      });
    // console.log(this.driverFormUpdate.value, "bbnmsdf");
  }

  addDriver() {
    this.driverData = [];
    JSON.stringify(
      this.driverForm.value,
      this.ReservationId,
      this.BookingDriverId
    );
    console.log(this.driverForm.value, "driverData:");

    this.apiService.addDrivers(this.driverForm.value).subscribe((res) => {
      console.log(res, "driverData:");

      this.driverData.push(res);
      this.fetchRelatedDrivers(this.reservationId);
    });
    // if (this.driverForm) {
    this.toastr.success("Driver Added Successfully");
    // } else {
    // this.toastr.error("Error");
    // }

    this.driverForm.reset();
  }

  fetchChaufferDrivers(reservationId: any) {
    this.fetchedDriverList = [];
    this.apiService.fetchAllChauffers().subscribe((chauffers) => {
      for (const f of chauffers) {
        this.fetchedDriverList.push(f)
      }

    })
  }


  fetchRelatedDrivers(reservationId: any) {
    this.fetchedDriverList = [];
    this.apiService.getRelatedDrivers(reservationId).subscribe((response) => {
      // console.log("driver", response);

      for (const e of response) {
        this.fetchedDriverList.push(e);
      }

    });
  }


  fetchDriverInfo(){
    console.log("cliicked");

    const ReservationId = this.actRoute.snapshot.params['ReservationId'];
      this.resvList=[]
this.apiService.fetchOneReservation(ReservationId).subscribe((res)=>{
  console.log("fetchedResvdriver", res);

  this.resvList.push(res)

  for(const dr of this.resvList){
    this.driverForm.patchValue({
      DriverFirstName:dr.BookingFor,
      // BookingFor:dr.DriverLastName
    })

  }
})



  }

  fetchDriver(BookingDriverId: any) {
    console.log("driverbYiD", BookingDriverId);
    this.DriverList = [];
    this.apiService.getDriversById(BookingDriverId).subscribe((response) => {

      this.DriverList.push(response);
      console.log("driver", this.DriverList);

      for (const mm of this.DriverList) {
        this.driverFormUpdate.patchValue({
          DriverFirstName: mm.DriverFirstName,
          DriverLastName: mm.DriverLastName,
          DriverDOB: mm.DriverDOB,
          DriverLicenseNo: mm.DriverLicenseNo,
          DriverLicenseIssue: mm.DriverLicenseIssue,
          DriverLicenseExpiry: mm.DriverLicenseExpiry,
          Nationality: mm.Nationality,
          IDPP: mm.IDPP,
          IDPPExpiry: mm.IDPPExpiry,
          CountryOfIssue: mm.CountryOfIssue,
          CountryOfResidence: mm.CountryOfResidence,
          AddressLine1: mm.AddressLine1,
          AddressLine2: mm.AddressLine2,
          AddressLine3: mm.AddressLine3,
          ContactNo: mm.ContactNo,
          Email: mm.Email,
          NextOfKinName: mm.NextOfKinName,
          NextOfKinContactNo: mm.NextOfKinContactNo,
          BookingRemarks: mm.BookingRemarks,
          ReservationId: mm.ReservationId,
          BookingDriverId: mm.BookingDriverId,
        });
      }
      console.log(this.driverFormUpdate);
    });
  }

  openTripEdit(editTrip: any) {
    this.modalService.open(editTrip, { size: "lg" }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }
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

  openTripServices(TripService: any) {
    this.modalService
      .open(TripService, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  openEditTripServices(EditTripService: any) {
    this.modalService
      .open(EditTripService, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  viewTripModal(content: TemplateRef<any>) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
          console.log("yessssssssss");
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  openEditIncident(incidentEdit: any) {
    this.modalService.open(incidentEdit, { size: "sm" }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }
  driversInfo: any;

  open(driversInfo: TemplateRef<any>) {
    this.modalService.open(driversInfo, { size: "lg" }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
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

  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return "by pressing ESC";
      case ModalDismissReasons.BACKDROP_CLICK:
        return "by clicking on a backdrop";
      default:
        return `with: ${reason}`;
    }
  }

  fetchRelatedTripIncidents(reservationId: any) {

  }
  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  printForm() {

    const printableContent = this.rentalAgreement.nativeElement.innerHTML;
    const originalContent = document.body.innerHTML;
    document.body.innerHTML = printableContent;
    window.print();
    document.body.innerHTML = originalContent;
    console.log('printable', printableContent)
  }









  nextStep() {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }


  // onCountryChange(selectedCountry: string | null) {
  //   if (!selectedCountry) {
  //     return;
  //   }
  
  //   const selected = this.countriesWithCodes.find(
  //     country => country.name === selectedCountry
  //   );
  //   if (selected) {
  //     this.driverForm.patchValue({ DialCode: selected.dialCode });
  //   }
  // }
  
  


}
