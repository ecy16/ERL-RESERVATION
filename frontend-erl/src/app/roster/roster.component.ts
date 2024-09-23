import { Component } from '@angular/core';
import { ApiService } from '../api.services';
import { CommonModule, NgFor } from '@angular/common';
import { DataTablesModule } from "angular-datatables";


@Component({
  standalone:true,
  selector: 'app-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.css'],
  imports:[
    CommonModule,
    NgFor,
    DataTablesModule

  ]
})
export class RosterComponent {
  dutiesList:any
  Trip:any;
  TripId:any;
  dtOptions: DataTables.Settings = {};

constructor(
  private apiService: ApiService,

){
  this.dutiesList=[]

}

ngOnInit(){
  // this.apiService.getSortedTrips().subscribe((res) => {
  //   console.log(res, "These days sorted trips ");
  //   for (const r of res) {
  //     this.dutiesList.push(r)
  //   }
  //   })
    this.dtOptions = {
      order: [[4, 'desc']]

    };


    this.apiService.fetchAllTransactions().subscribe((res: any) => {
      console.log(res, 'the vehicleouts/in');
      for (const t of res) {
        if (t.MileageIN >0 && t.FuelIN >0)  {
          this.dutiesList.push(t);
        }
      }
    });
  
}







}

  //  "node_modules/datatables.net-bs5/js/dataTables.bootstrap5.min.js",
  
  //             "./node_modules/html2pdf.js/dist/html2pdf.bundle.min.js"
  // "node_modules/datatables.net-dt/css/jquery.dataTables.min.css",
