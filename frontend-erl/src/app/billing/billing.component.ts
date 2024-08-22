import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from '../api.services';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router,RouterModule } from '@angular/router';
import { CommonModule, JsonPipe, NgFor } from "@angular/common";
import { Config } from 'datatables.net';
import { DataTablesModule } from 'angular-datatables';





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
    RouterModule


  ]
})

export class BillingComponent {



  dtOptions: DataTables.Settings = {};
  completedBillings: any;

  constructor(
    private apiService: ApiService,
    private toastr: ToastrService,
    private actRoute: ActivatedRoute,
    private router: Router

  ) { }

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
}
