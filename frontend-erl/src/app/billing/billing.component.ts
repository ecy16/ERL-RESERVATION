import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.services';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule, JsonPipe, NgFor } from "@angular/common";
import { Config } from 'datatables.net';
import { DataTablesModule } from 'angular-datatables';
import { MatIconModule } from "@angular/material/icon";

import { ReactiveFormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  standalone: true,
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css'],
  imports: [
    CommonModule,
    NgFor,
    JsonPipe,
    DataTablesModule,
    RouterModule,
    MatIconModule,
    ReactiveFormsModule

  ]
})

export class BillingComponent {



  dtOptions: DataTables.Settings = {};
  completedBillings: any;
  closeResult = '';
  bookingInfo: any;
  billingDetails: any = {};
  ReservationId: any;
  billingForm: FormGroup;
  tripInfo: any;
  serviceInfo: any = '';
  formBuilder: any;
  getDismissReason: any;
  private modalService = inject(NgbModal);
  // searchForm:FormGroup;


  constructor(
    private apiService: ApiService,
    private toastr: ToastrService,
    private actRoute: ActivatedRoute,
    private router: Router

  ) {
    this.billingDetails = []
    this.tripInfo = []
    this.billingForm = this.formBuilder
    this.bookingInfo = []



    // this.searchForm = this.formBuilder.group({
    //   BookingNo: ["", Validators.required],
    //   fromDate: ["", Validators.required],
    //   toDate: ["", Validators.required],
    //   BookingStatus: ["InProgress", Validators.required],
    //   BookingType: ["", Validators.required],
    //   Branch: ["", Validators.required],
    //   BookingCategory: ["", Validators.required]

    // })
    // this.billingForm = this.formBuilder.group({
    //   BookingNo: [''], // Initialize with appropriate form controls based on your needs
    //   Date: [''],
    //   BillingTo: this.formBuilder.group({
    //     BookingFor: [''],
    //     CompanyName: [''],
    //     CompanyCode: [''],
    //     ContractId: [''],
    //     PickUpAddress: [''],
    //     DropAddress: [''],
    //     FromDateTime: [''],
    //     ToDateTime: ['']
    //   }),
    //   Summary: [[]], // Initialize as an array since ngFor expects an array
    //   TripDetails: [[]], // Initialize as an array since ngFor expects an array
    //   TripServices: [[]], // Initialize as an array since ngFor expects an array
    //   Subtotal: [''],
    //   Tax: [''],
    //   Total: ['']
    // });


  }


  ngOnInit() {
    this.dtOptions = {
      order: [[4, 'asc']],
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      autoWidth: true



    }
    this.completedBillings = []

    this.apiService.fetchAllTrips().subscribe((bills: any[]) => {

      this.completedBillings = bills.filter(resv => {
        return resv.TripStatus === 'Completed'

      });
    })


    // this.apiService.fetchAllTransactions().subscribe((res: any) => {
    //   console.log(res, 'the vehicleouts/in');
    //   this.completedBillings =(res)
    //   // this.completedBillings = res.filter((t: any) => t.tripStatus === 'Completed' && t.MileageIN > 0 && t.FuelIN > 0);
    //   console.log(this.completedBillings, 'completed billings');
    // });













  }

  loaderVisible = false; // Initially the loader is hidden
  divVisible = false;
  show() {
    this.loaderVisible = true;
    this.toastr.info('Posting to sage')

    setTimeout(() => {
      this.loaderVisible = false;

      this.toastr.show("Billing is successful. Proceed to Print invoice");
      this.divVisible = true;
    }, 3000);
  }



  fetchBill(TripId: any) {
    this.apiService.fetchTrips(TripId).subscribe((res) => {
      console.log('BillingRes', res)
      // for( const m of res){
      this.bookingInfo = (res)

      // }

    })


  }

  openBill(viewBilling: any) {
    console.log("viewBilling");

    this.modalService.open(viewBilling, { size: "lg" }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }




}
