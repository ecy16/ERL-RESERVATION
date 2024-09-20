import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ApiService } from '../api.services';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, NgFor } from "@angular/common";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from "ngx-toastr";
import { MatIconModule } from "@angular/material/icon";
import { NgbAccordion, NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbAccordionItem } from '@ng-bootstrap/ng-bootstrap';

@Component({
  standalone: true,
  selector: 'app-billing-details',
  templateUrl: './billing-details.component.html',
  styleUrls: ['./billing-details.component.css'],
  imports: [
    CommonModule,
    NgFor,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    NgbAccordionModule,
    NgbModule,
    
  ],
})
export class BillingDetailsComponent {
  billingDetails: any = {};
  ReservationId: any;
  billingForm: FormGroup;
  bookingInfo: any = '';
  bilingTrip:any;
  tripInfo: any;
  serviceInfo: any = '';
  modalService: any;
  closeResult = '';
  TransactionId: any;
  assignmentAllTrips: any;
  dateVal = new Date();

  constructor(
    private actRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,

    private apiService: ApiService
  ) {

    this.billingDetails = []
    this.tripInfo = []
this.bilingTrip=[]
    this.billingForm = this.formBuilder.group({
      BookingNo: [''], // Initialize with appropriate form controls based on your needs
      Date: [''],
      BillingTo: this.formBuilder.group({
        BookingFor: [''],
        BookingNo:[''],
        companyName: [''],
        CompanyCode: [''],
        ContractId: [''],
        PickUpAddress: [''],
        DropAddress: [''],
        FromDateTime: [''],
        ToDateTime: ['']
      }),
      Summary: [[]], // Initialize as an array since ngFor expects an array
      TripDetails: [[]], // Initialize as an array since ngFor expects an array
      TripServices: [[]], // Initialize as an array since ngFor expects an array
      Subtotal: [''],
      Tax: [''],
      Total: ['']
    });


  }




  ngOnInit() {
    console.log('billingdetailsView');

    this.ReservationId = this.actRoute.snapshot.params["ReservationId"];
    this.TransactionId = this.actRoute.snapshot.params["TransactionId"];



    this.apiService.fetchResvTrip(this.ReservationId).subscribe((res) => {
      console.log(res, 'this is myreposne')

      for (const f of res) {
        this.billingForm.patchValue({
          BookingFor:f.BookingFor,
          BookingNo:f.BookingNo,
          companyName:f.companyName,
        })

        
        console.log(this.billingForm.value, 'this is tripInfo')
this.bilingTrip.push(f)
      }
    })

    this.apiService.GetBillById(this.ReservationId).subscribe((res) => {
      this.billingDetails = res;
      // this.billingDetails.push(res)
      this.tripInfo = []
      this.tripInfo = this.billingDetails.tripDetails;

      // for x in this.billingDetails.tripDetails
      // for (const c of this.billingDetails.tripDetails) {
      //   this.tripInfo.push(c);
      // }

      this.serviceInfo = this.billingDetails.services;

      console.log('bookingInfo', this.bookingInfo);
      console.log('tripInfo', this.tripInfo);
      console.log('serviceInfo', this.serviceInfo);
    });
  }


  
  show() {
    this.toastr.success("Billing is successful.Proceed to Print invoice");
  }




  populateForm(data: any): void {
    this.billingForm.patchValue({
      BookingNo: data.BookingNo,
      Date: data.Date,
      BillingTo: {
        BookingFor: data.BillingTo.BookingFor,
        companyName: data.BillingTo.companyName,
        CompanyCode: data.BillingTo.CompanyCode,
        ContractId: data.BillingTo.ContractId,
        DropAddress: data.BillingTo.DropAddress,
        PickUpAddress: data.BillingTo.PickUpAddress,
        FromDateTime: data.BillingTo.FromDateTime,

        ToDateTime: data.BillingTo.ToDateTime,
        TripCharge: data.TripCharge,
        TripNo: data.TripNo,
        ServiceName: data.ServiceName
      },
      Summary: data.Summary,
      TripDetails: data.TripDetails,
      TripServices: data.TripServices,
      Subtotal: data.Subtotal,
      Tax: data.Tax,
      Total: data.Total
    });
    console.log('patchedform',)

  }



  openEditAssignment(editAssignment: any) {
    console.log("openeditTripAssignment");

    this.modalService.open(editAssignment, { size: "lg" }).result.then(
      (result: any) => {
        this.closeResult = `Closed with: ${result}`;
      },

    );
  }
  @ViewChildren(NgbAccordion)
  accordions!: QueryList<NgbAccordion>;

  // Method to toggle accordion by index or ID
  toggleAccordion(index: number) {
    const accordion = this.accordions.toArray()[index];
    if (accordion) {
      accordion.toggle(`panel-${index}`);
    }
  }
}
