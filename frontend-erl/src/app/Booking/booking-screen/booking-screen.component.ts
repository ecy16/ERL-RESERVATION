import {
  Component,
  inject,
  Pipe,
  Input,
  TemplateRef,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnInit,
} from "@angular/core";
import { CommonModule, JsonPipe, NgFor } from "@angular/common";
import { MatTabsModule } from "@angular/material/tabs";
import { FormsModule } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatPaginatorModule } from '@angular/material/paginator';
import { DataTableDirective, DataTablesModule } from "angular-datatables";
import { DatePipe } from '@angular/common';




import {
  NgbAlertModule,
  NgbCalendar,
  NgbDate,
  NgbDateParserFormatter,
  NgbDatepickerModule,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';


import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { ApiService } from "src/app/api.services";
// import { ApiService } from "src/app/api.services-old";
import { MatIconModule } from "@angular/material/icon";
import { Router, RouterModule } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import dt4Config from 'datatables.net';
import { data, error } from "jquery";

import { Config } from 'datatables.net';

import * as moment from "moment";
import { ModalService } from "src/app/Modal.service";
import { BookingDetailsComponent } from "../booking-details/booking-details.component";

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
  selector: "app-booking-screen",
  standalone: true,

  imports: [
    CommonModule,
    MatTabsModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatIconModule,
    RouterModule,
    NgFor,
    NgbDatepickerModule,
    NgbAlertModule,
    MatPaginatorModule,
    DataTablesModule,
    NgbDatepickerModule,
    JsonPipe,



  ],
  templateUrl: "./booking-screen.component.html",
  styleUrls: ["./booking-screen.component.css"],

})
export class BookingScreenComponent implements OnInit {
  @ViewChild('addTrips') addTrips: any;

  dateVal = new Date();

  isCollapsed = false;
  selectedIndex = '1'
  bookingForm: FormGroup;
  searchForm: FormGroup;

  selectedOption: string = "";
  categoryChosen: string = "";
  showOption: string = "";
  category_Options: any;
  columns: any;
  element: any;
  reservations: any;
  stringifiedData: any;
  formData: any;
  companyDetails!: FormGroup;
  BookingData: any;
  tripData: any;
  id: any;
  reservationId: any | string;
  BookingDetails: any;
  private _router: any;
  model: any;
  companiesData: any;
  bookingcategories: any;
  bookingCategoriesData: any;
  relatedCustCode: any;
  relatedCustName: any;
  bookingtypes: any;
  bookingTypesData: any;
  dtOptions: DataTables.Settings = {};


  date: any;
  driverData: any;
  DriverDOB: any;
  DriverLicenseNo: any;
  b: any;
  a: any;
  // reservationData: any;
  categories: any;
  types: any;
  company: any;
  bookingBranchData: any;
  bookingChargeData: any;
  bookingSourceData: any;
  bookingStatusData: any;
  contractsData: any;
  closeResult: string | undefined;


  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;
  // dataTable: JQueryDataTableJq | undefined ;



  filteredReservations: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10; // Adjust as needed
  searchQuery: string = "";
  driversInfo: any;
  header: any;
  search: any;
  column: any;

  private modalService = inject(NgbModal);




  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private toastr: ToastrService,
    private actRoute: ActivatedRoute,
    private router: Router,
    private modal: NgbModal
  ) {

    this.BookingData = [];
    this.companiesData = [];
    this.contractsData = [];
    this.bookingCategoriesData = [];
    this.bookingTypesData = [];
    this.bookingChargeData = [];
    this.bookingSourceData = [];
    this.bookingBranchData = [];
    this.bookingStatusData = [];
    this.relatedCustCode = [];
    this.relatedCustName = [];
    this.reservations = []




    this.searchForm = this.formBuilder.group({
      BookingNo: ["", Validators.required],
      fromDate: ["", Validators.required],
      toDate: ["", Validators.required],
      BookingStatus: ["InProgress", Validators.required],
      BookingType: ["", Validators.required],
      Branch: ["", Validators.required],
      BookingCategory: ["", Validators.required]

    })

    this.bookingForm = this.formBuilder.group({
      BookingNo: ["", Validators.required],
      BookingCategory: ["", Validators.required],
      BookingType: ["", Validators.required],
      Branch: ["", Validators.required],
      BookingStatus: ["InProgress", Validators.required],
      BookingFor: ["", Validators.required],
      Source: ["", Validators.required],
      SourceRefNo: ["", Validators.required],

      TotalAmount: ["", Validators.required],
      TotalPaid: ["", Validators.required],
      ExchangeRate: ["", Validators.required],
      ContractId: ["", Validators.required],

      CompanyCode: ["", Validators.required],
      companyName: ["", Validators.required],
      PayeeCompanyName: ["", Validators.required],
      Remarks: ["", Validators.required],
      ContractNo: ["", Validators.required],
      BookingDate: ["", Validators.required]
      // BookingDate: [{ value: this.getTodayDate(), disabled: true }, Validators.required],


    });


  }




  ngOnInit() {
    this.dtOptions = {
      order: [[8, 'asc']],
      // ordering: false,
      autoWidth: true
    }



    this.companyDetails = this.formBuilder.group({});

    this.apiService.getReservations().subscribe(

      (data: any[]) => {

        this.filteredReservations = data.filter(reservation => {
          return reservation.BookingStatus === 'InProgress';
        });
        this.reservationData = [...this.filteredReservations];


        // if (this.filteredReservations.length === 0) {
        //   alert('No active contracts found.');
        // }


        this.reservationData = []
        this.reservationData.push(this.filteredReservations);
      }

    );

    this.fetchAllTrips();

    this.apiService.getBookingCategories().subscribe((categories: any) => {
      for (const a of categories) {
        this.bookingCategoriesData.push(a);
      }
    });
    this.apiService.getBookingTypes().subscribe((BookingType: any) => {
      for (const b of BookingType) {
        this.bookingTypesData.push(b);
      }
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


    const BookingDateSX = moment(new Date()).format("YYYY-MM-DD")

    this.searchForm.patchValue({
      fromDate: BookingDateSX,
      toDate: BookingDateSX,
      BookingStatus: "InProgress"

    });

    this.getRelatedContract()
  }




  saveBookingData() {
    const data = JSON.stringify(this.bookingForm.value);
    console.log('BookingInformation', this.bookingForm.value)
    this.apiService.addReservation(this.bookingForm.value)
      .subscribe((response: any) => {
        console.log('responseBookingInfo', response)
        const ReservationId = response.ReservationId;




        this.fetchAllTrips();

        this.router.navigate([`BookingDetails/${ReservationId}`]);


        this.toastr.success("Booking Added Successfully");
      });


    console.log('BookingInformation2', this.bookingForm.value)


    this.bookingForm.reset();
  }
  addTripModal() {
    // and use the reference from the component itself
    this.modalService.open(this.addTrips).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      console.log(reason);
    });
  }


  
  open(dates: any) {
    this.modalService.open(dates, { ariaLabelledBy: 'modal-basic-title' });
  }


  // addTripModals(addTrip: any) {

  //   this.modalService.open(addTrip, { size: "lg" });
  // }

  // callModal() {
  //   const modalRef = this.modalService.open(BookingDetailsComponent,
  //     { size: 'xl', backdrop: 'static', keyboard: false, windowClass:'my-modal' 
  //     });
  // }

  searching() {
    this.filteredReservations = [];

    this.apiService.searchValue(this.searchForm.value).subscribe(
      (res: any[]) => {
        this.filteredReservations = res;
      },
      (error) => {
      }
    );
  }





  // Update form controls

  // Trigger search whenever a date is selected




  maxDate() {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  reservationData: any[] = [];

  fetchAllTrips() {
    this.reservationData = [];
    this.apiService.getReservations().subscribe((reservations: any[]) => {
      this.reservationData.push(reservations)
      // this.reservationData.push(reservations);
      // this.filteredReservations = reservations;
    });
  }


  viewBooking() {
  }

  onCategoryChange(event: any) {
    this.categoryChosen = event.target.value;
  }

  getRelatedCustCode(name: any) {
    this.relatedCustCode = [];
    this.apiService.getRelatedCustCode(name).subscribe((custCode: any) => {
      for (const bb of custCode) {
        this.relatedCustCode.push(bb);
        this.bookingForm.patchValue({
          CompanyCode: this.relatedCustCode[0].Account,
        });
      }
    });
  }

  getRelatedCustName(code: any) {
    this.relatedCustName = [];
    this.apiService.getRelatedCustName(code).subscribe((custName: any) => {
      for (const aa of custName) {
        this.relatedCustName.push(aa);
        this.bookingForm.patchValue({
          companyName: this.relatedCustName[0].Name,
        });
      }
    });
  }


  getRelatedContract(): void {
    this.contractsData = [];
    this.apiService.findDemandContracts().subscribe((res: any) => {

      for (const g of res) {
        this.contractsData.push(g)
      }
      // this.contractsData=contracts;
    });
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
}
