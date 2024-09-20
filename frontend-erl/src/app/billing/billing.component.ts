import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../api.services';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router,RouterModule } from '@angular/router';
import { CommonModule, JsonPipe, NgFor } from "@angular/common";
import { Config } from 'datatables.net';
import { DataTablesModule } from 'angular-datatables';
import { MatIconModule } from "@angular/material/icon";

import { ReactiveFormsModule } from '@angular/forms';



@Component({
  standalone:true,
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
  modalService: any;
  closeResult='';
  bookingInfo: any ='';
  billingDetails: any = {};
  ReservationId: any;
  billingForm: FormGroup;
  tripInfo: any ;
  serviceInfo: any ='';
  formBuilder: any;
    getDismissReason: any;

  constructor(
    private apiService: ApiService,
    private toastr: ToastrService,
    private actRoute: ActivatedRoute,
    private router: Router

  ) {
    this.billingDetails = []
    this.tripInfo =[]
    this.billingForm=this.formBuilder
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
      order: [[8, 'asc']],
      // ordering: false,
      autoWidth: true



    }
    this.completedBillings=[]
    this.apiService.getAllBillings().subscribe((billing: any) => {
      console.log(billing,'billings')
      // this.completedBillings.push(billing)
    for (const c of billing) {
      this.completedBillings.push(c);
    }

      console.log('CompletedBillings', this.completedBillings)
    })

    // reservationData: any[] = [];

    // fetchAllTrips() {
    //   this.reservationData = [];
    //   this.apiService.getReservations().subscribe((reservations: any[]) => {
    //     this.reservationData.push(reservations)
    //     // this.reservationData.push(reservations);
    //     // this.filteredReservations = reservations;
    //   });
    // }






    // console.log('customernme',this.completedBillings)




  }
  viewBill(){
    console.log("sucesss");

  }
  show(){
    this.toastr.success("Billing is successful.Proceed to Print invoice");
  }

  openBill(viewBilling: any) {
    console.log("viewBilling");

    this.modalService.open(viewBilling, { size: "lg" }).result.then(
      (result: any) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason: any) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }
  
 
}
