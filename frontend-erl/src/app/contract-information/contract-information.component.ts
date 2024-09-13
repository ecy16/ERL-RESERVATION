import { Component } from '@angular/core';
import { ApiService } from '../api.services';
import { CommonModule, NgFor } from "@angular/common";
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { NgbAlertModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone:true,
  selector: 'app-contract-information',
  templateUrl: './contract-information.component.html',
  styleUrls: ['./contract-information.component.css'],
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
export class ContractInformationComponent {





  contractsInfo: any;
  contractsDetails:any;
  contractsDetailsData:any;
  ContractId:any;
  ContractDetailsId:any;


  constructor(
    private apiService: ApiService,
    private actRoute: ActivatedRoute

  ){
    this.contractsInfo = [];
    this.contractsDetails = [];
    this.contractsDetailsData = [];



  }


  ngOnInit(){
    this.ContractId = this.actRoute.snapshot.params["ContractId"];
    this.ContractDetailsId = this.actRoute.snapshot.params["ContractDetailsId"];

    this.apiService
    .getContractById(this.ContractId)
    .subscribe((response) => {

      // for (const x of response) {
      //   this.contractsInfo.push(x);
      // }
      this.contractsInfo.push(response)
      console.log('respoooooonse',response)
  })



  this.apiService.getRelatedContractDetails(this.ContractId).subscribe((res) => {
    this.contractsDetails.push(res)
    console.log(res,"responseFromviewContract")
      })


      this.apiService.getOneContractDetailsById(this.ContractId).subscribe((res) => {
        console.log(res,"the response for details")

        this.contractsDetails.push(res);
        this.contractsDetailsData = res;
      });
    }

    fetchContractDetails(){
      this.apiService.getContractsDetails().subscribe((res)=>{
        console.log('trinida',res)
      })
    }

// viewContract(ContractId:any) {

//   this.apiService.getOneContractDetailsById(ContractId).subscribe((res) => {
// this.contractsInfo.push(res)
// console.log(res,"responseFromviewContract")
//   })
// }
}
