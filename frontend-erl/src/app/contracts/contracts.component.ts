import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective, DataTablesModule } from "angular-datatables";
import { get } from 'jquery';
import { ToastrService } from "ngx-toastr";
import { ApiService } from '../api.services';
import { RouterModule } from "@angular/router";

import { MatIconModule } from "@angular/material/icon";
import { interval } from 'rxjs';
import { FileUploadService } from "fileUpload.service";
import * as moment from 'moment';




@Component({
  standalone: true,

  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.css'],

  imports: [
    CommonModule,
    MatTabsModule,
    ReactiveFormsModule,
    DataTablesModule,
    MatIconModule,
    RouterModule,
    FormsModule,]
})
export class ContractsComponent {

  selectedIndex = '1'
  dtOptions: DataTables.Settings = {};
  contractForm: FormGroup;
  contractEditForm: FormGroup;

  contractDetailForm: FormGroup;
  contractEditDetailForm: FormGroup;
  contracts: any[];
  bookingTypesData: any;
  closeResult = "";
  isSubmitted: boolean = false;
  types: any;
  search: any;
  ChargeCurrData: any;
  relaedTypeData: any;

  searchQuery: string = "";

  isChecked = false;
  weekCheck = false;
  monthCheck = false;
  dayCheck = false;
  private modalService = inject(NgbModal);
  getDismissReason: any;
  router: any;
  contractList: any;
  contractDetailList: any;
  contractsResponse: any
  companiesData: any;
  relatedCustCode: any;
  billingDays: any;
  relatedCustName: any;
  contractsInfo: any;
  searchForm: FormGroup;
  relatedCurr: any;
  relatedchargeType: any;
  ChargeCurr: any[] = [];
  chargeTypeData: any[] = [];
  selectedFile: File | any;
  selectedImage: File | null = null;
  filteredContracts: any[] = [];
  File:any;


  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private apiService: ApiService,
    private actRoute: ActivatedRoute,
    private fileUploadService: FileUploadService



  ) {
    this.contracts = [];
    this.bookingTypesData = [];
    this.contractsData = []
    this.contractsResponse = []
    this.companiesData = []
    this.relatedCustCode = [];
    this.ChargeCurrData = [];
    this.chargeTypeData = [];
    this.relatedchargeType = [];


    this.billingDays = [];

    this.contractList = [];
    this.contractDetailList = [];
    this.contractsDetailsData = [];
    this.contractsInfo = [];


    for (let i = 1; i <= 28; i++) {
      this.billingDays.push(i);
    }


    this.searchForm = this.formBuilder.group({
      ContractId: ["", Validators.required],
      ContractNo: ["", Validators.required],
      companyName: ["", Validators.required],
      CompanyCode: ["", Validators.required],
      StartDate: ["", Validators.required],
      EndDate: ["", Validators.required],
      status: ['Active', Validators.required],
      image: ['Active', Validators.required],



    })
    this.contractForm = this.formBuilder.group({

      ContractNo: ["", Validators.required],

      companyName: ["", Validators.required],
      CompanyCode: ["", Validators.required],
      StartDate: ["", Validators.required],
      EndDate: ["", Validators.required],
      BillingDay: ["", Validators.required],
      status: ['Active', Validators.required],
      ContractIdTemp: ["", Validators.required],
      image: ['Active', Validators.required],





    })

    this.contractEditForm = this.formBuilder.group({
      ContractId: ["", Validators.required],
      ContractNo: ["", Validators.required],
      companyName: ["", Validators.required],
      CompanyCode: ["", Validators.required],
      StartDate: ["", Validators.required],
      EndDate: ["", Validators.required],
      BillingDay: ["", Validators.required],
      status: ['Active', Validators.required],




    })

    this.contractEditDetailForm = this.formBuilder.group({
      ContractId: ["", Validators.required],
      ContractDetailsId: ["", Validators.required],

      ContractDetailNo: ["", Validators.required],
      status: ['Active', Validators.required],
      BookingType: ["", Validators.required],
      vehicleType: ["", Validators.required],
      Transmission: ["", Validators.required],
      NoOfVehicles: ["", Validators.required],
      ServiceFromDate: ["", Validators.required],
      ServiceToDate: ["", Validators.required],
      ChargeType: ["", Validators.required],
      ChargeAmount: ["", Validators.required],
      ChargeCurr: ["", Validators.required],
      every: ["", Validators.required],
      day: ["", Validators.required],
      week: ["", Validators.required],
      month: ["", Validators.required],
      frequency: [''],
      interval: [''],
      onDemand:['']
    })



    this.contractDetailForm = this.formBuilder.group({

      ContractId: ["", Validators.required],
      ContractDetailNo: ["", Validators.required],
      status: ['Active', Validators.required],
      BookingType: ["", Validators.required],
      vehicleType: ["", Validators.required],
      Transmission: ["", Validators.required],
      NoOfVehicles: ["", Validators.required],
      ServiceFromDate: ["", Validators.required],
      ServiceToDate: ["", Validators.required],
      ChargeType: ["", Validators.required],
      ChargeAmount: ["", Validators.required],
      ChargeCurr: ["", Validators.required],
      frequency: [''],





    })





  }


  ngOnInit() {

    this.dtOptions = {
      order: [[0, 'desc']],
      autoWidth: true

    }
    this.apiService.findContracts().subscribe((data: any[]) => {
      this.filteredContracts = data.filter(contract => {
        return contract.status === 'Active'
      });
      console.log('contracts for today', this.filteredContracts);
      this.contractsData = [...this.filteredContracts];

     
      this.contractsData = []
      this.contractsData.push(this.filteredContracts);
    });



    // this.apiService.findContracts().subscribe((data:any[])=>{
    //   this.contractsData = data.filter(contract=>{
    //     return contract.status ==='Active'
    //   });
    //   console.log('contracts that are active',this.contractsData)
    //   this.contractsData=[...this.contractsData];
    // })

    this.fetchAllContracts()

    this.apiService.getCompanies().subscribe((company: any) => {
      for (const c of company) {
        this.companiesData.push(c);
      }
    });
    this.apiService.getBookingTypes().subscribe((BookingType: any) => {
      for (const b of BookingType) {
        this.bookingTypesData.push(b);
        console.log(this.bookingTypesData, "bookingTypesData");
      }
      console.log(this.types, "bookingTypesData");
    });


    this.loadCurrencies();


    this.contractDetailForm.get('ContractId')?.valueChanges.subscribe(contractId => {
      this.getRelatedCharges(contractId);
      this.getRelatedChargeType(contractId)
    });
    const ContractDateSX = moment(new Date()).format("YYYY-MM-DD")

    this.searchForm.patchValue({
      StartDate: ContractDateSX,
      EndDate: ContractDateSX,
      status: "InProgress"

    });

  }




  get selectedFrequency() {
    return this.contractDetailForm.get('frequency')?.value;
  }


  loadCurrencies(): void {
    this.apiService.findCurr().subscribe(
      (data: any) => {
        this.ChargeCurrData = data;
      },
      (error) => {
        console.error('Error fetching currency data', error);
      }
    );
  }

  searching() {
    this.contractsData = [];

    this.apiService.searchContracts(this.searchForm.value).subscribe(
      (res: any[]) => {
        console.log(res, 'response from API');
        this.contractsData = res;
      },
      (error) => {
        console.error('Error fetching search results', error);
      }
    );
    console.log(this.contractsData, 'filtered contracts');
  }

  onCheckboxChange(event: Event): void {
    console.log('FormValues', this.contractForm.value)

    const inputElement = event.target as HTMLInputElement;
    if (inputElement.checked) {
      const confirmProceed = window.confirm('This action saves the Contract.Do you wish to proceed?');

      ;
      if (!confirmProceed) {
        inputElement.checked = false;
        this.isChecked = false;
      }

    }
    JSON.stringify(this.contractForm.value)
    // this.contracts.push(this.contractForm.value)
    // this.contractsData.push(this.contractForm.value)

    this.contractForm.disable();
    this.isSubmitted = true;
    this.apiService.addContract(this.contractForm.value).subscribe((res) => {

      this.contractsResponse.push(res)
      console.log(this.contractsResponse, 'dfghjk')
      this.toastr.success("Contract Added Successfully");

      for (const y of this.contractsResponse) {
        this.contractForm.patchValue({
          ContractId: y.ContractId,
          ContractNo: y.ContractNo,
          companyName: y.companyName,
          CompanyCode: y.CompanyCode,
          StartDate: y.StartDate,
          EndDate: y.EndDate,
          BillingDay: y.BillingDay,
          ContractIdTemp: y.ContractId

        })

      }


      for (const x of this.contractsResponse) {
        this.contractDetailForm.patchValue({
          ContractId: x.ContractId,
          companyName: x.companyName

        }
        )
        console.log('contractIID')

      }



      this.uploadImg()



      this.fetchAllContracts()
    })


  }

  onImageUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
    console.log('files uploaded', this.selectedFile)
  }

  uploadImg() {
    if (!this.selectedFile) {
      console.log('No file selected');
      return;
      
    }

    // this.fileUploadService.uploadFile(this.selectedFile).subscribe(
    //   (response) => {
    //     console.log('Response:................the file', response);
    //     if (response && response.filePath) {
    //       console.log('File path:', response.filePath);
    //       this.saveImagePath(response.filePath);
    //     }
    //   },
    //   err => {
    //     console.error('Error:', err);
    //   }
    // );


    this.fileUploadService.uploadFile(this.File).subscribe((res)=>{
      console.log('Response:.......of second Api.........the file', res);
          if (res && res.filePath) {
            this.saveImagePath(res.filePath);
            console.log('Image path saved successfully', res.filePath);

         }
    })
    
  }
  // uploadFile

  saveImagePath(filePath: string): void {
    this.fileUploadService.saveImagePath(filePath).subscribe(
      res => {
        console.log('Image path saved successfully', res);
      },
      err => {
        console.error('Error saving image path:', err);
      }
    );
  }


  
  
  contractsData: any[] = []

  getRelatedCustCode(name: any) {
    console.log(name, "name");
    this.relatedCustCode = [];
    this.apiService.getRelatedCustCode(name).subscribe((custCode: any) => {
      for (const bb of custCode) {
        this.relatedCustCode.push(bb);
        console.log(this.relatedCustCode[0]);
        this.contractForm.patchValue({
          CompanyCode: this.relatedCustCode[0].Account,
        });
      }
    });
  }





  getRelatedCustName(code: any) {
    this.relatedCustName = [];
    console.log(code, "code");
    this.apiService.getRelatedCustName(code).subscribe((custName: any) => {
      for (const aa of custName) {
        this.relatedCustName.push(aa);
        this.contractForm.patchValue({
          companyName: this.relatedCustName[0].Name,
        });
      }
    });

  }

  getRelatedContract(): void {
    this.contractsData = [];
    console.log('contracts are being fetched');
    this.apiService.findContracts().subscribe((contracts: any[]) => {
      this.contractsData = contracts;
      if (this.contractsData.length > 0) {
        this.contractForm.patchValue({
          companyName: this.contractsData[0].companyName
        });
      }
      console.log('contracts init', contracts);
    });
  }




  fetchAllContracts() {
    this.contractsData = [];
    this.apiService.getContracts().subscribe((contracts: any[]) => {
      // this.reservationData = reservations;
      this.contractsData.push(contracts);
      this.contractsData = contracts;
    });
  }
  fetchAllContractsDetails() {
    this.contractsDetailsData = [];
    this.apiService.getContractsDetails().subscribe((res: any[]) => {
      // this.reservationData = reservations;
      this.contractsDetailsData.push(res);
      this.contractsDetailsData = res;
    });
  }




  fetchContractsDetailsById(ContractId: any) {
    console.log('oneContractDetail', ContractId)
    this.contractsDetailsData = [];
    this.apiService.getOneContractDetailsById(ContractId).subscribe((res) => {
      this.contractsDetailsData.push(res);
      this.contractsDetailsData = res;
      console.log('oneContractDetail', res)

    });

  }


  fetchRelatedContractsDetails(ContractId: any) {
    console.log('oneContractDetail', ContractId)
    this.contractsDetailsData = [];
    this.apiService.getRelatedContractDetails(ContractId).subscribe((res) => {
      this.contractsDetailsData.push(res);
      this.contractsDetailsData = res;
      console.log('relatedDetails', res)

    });

  }


  viewContract() {

    //     this.apiService.getOneContractDetailsById(ContractId).subscribe((res) => {
    // this.contractsInfo.push(res)
    // console.log(res,"responseFromviewContract")
    //     })
  }
  contractsDetailsData: any[] = []

  saveContractDetails() {
    JSON.stringify(this.contractDetailForm.value)
    console.log('Contract Details', this.contractDetailForm.value)

    this.apiService.addContractDetails(this.contractDetailForm.value).subscribe((res) => {
      this.contractsDetailsData.push(res);
      console.log('contractDetails response from API', res);

      this.fetchRelatedContractsDetails(this.contractDetailForm.value.ContractId);

      this.toastr.success("Contract Details added successfully");

    }, (error) => {
      console.error('Error saving contract details', error);
    }
    )


  }
  copyDetails(ContractDetailsId: any) {
    console.log(ContractDetailsId, 'Detail:ContractDetailsId')

    const userConfirmed = window.confirm('This action copies the contract details. Do you wish to proceed?');
    if (userConfirmed) {

      this.apiService.getOneContractDetailsById(ContractDetailsId).subscribe((res: any) => {
        console.log(res, "ressponse")



        // Remove the ContractDetailsId property from the response
        const { ContractDetailsId, ...rest } = res;

        // Log the modified response
        console.log(rest, "modified response");

        this.apiService.addContractDetails(rest).subscribe((response) => {
          // this.contractsDetailsData.push(res)
          this.fetchRelatedContractsDetails(response.ContractId)

          console.log(response, "copied response");

        })


      })
    }
    else {
      console.log('Action cancelled by user.');
    }
  }



  fetchContract(ContractId: any) {
    console.log("ContractId", ContractId);
    JSON.stringify(this.contractForm.value)
    this.contractList = [];
    this.apiService.getByIdContracts(ContractId).subscribe((response) => {

      this.contractList.push(response);
      console.log("contract", response);

      for (const mm of this.contractList) {
        this.contractEditForm.patchValue({
          ContractId: mm.ContractId,
          ContractNo: mm.ContractNo,
          CustomerContractNo: mm.CustomerContractNo,
          Customer: mm.Customer,
          Name: mm.Name,
          StartDate: mm.StartDate,
          EndDate: mm.EndDate,
          BillingDay: mm.BillingDay,

        });
      }
      console.log(this.contractEditForm);
    });
  }
  updateContract(ContractId: any) {
    console.log("ContractId", ContractId);
    JSON.stringify(this.contractForm.value)
    this.contractList = [];
    this.apiService.updateContract(ContractId, this.contractEditForm).subscribe((response) => {

      this.contractList.push(response);
      console.log("contract", response);

      for (const mm of this.contractList) {
        this.contractEditForm.patchValue({
          ContractId: ["", Validators.required],
          CustomerContractNo: ["", Validators.required],
          ContractNo: ["", Validators.required],
          Customer: ["", Validators.required],
          Name: ["", Validators.required],
          StartDate: ["", Validators.required],
          EndDate: ["", Validators.required],
          BillingDay: ["", Validators.required],


        });
      }
      console.log(this.contractEditForm);
    });
  }


  editContract(ContractId: any) {
    console.log(ContractId, "contract Edit");
    JSON.stringify(
      this.contractEditForm.value,
      ContractId,
    );
    this.apiService
      .editContracts(ContractId, this.contractEditForm.value)
      .subscribe(() => {
        this.fetchContract(ContractId)
        this.fetchAllContracts()
        this.toastr.success("Contract updated successfully");
        console.log(this.contractEditForm.value, "contractEditForm");
      });
    // console.log(this.driverFormUpdate.value, "bbnmsdf");
  }

  EditDetails(ContractDetailsId: any) {

    JSON.stringify(
      this.contractEditDetailForm.value,
      ContractDetailsId,
    );
    this.apiService
      .editContractsDetails(ContractDetailsId, this.contractEditDetailForm.value)
      .subscribe((response: any) => {
        console.log(response, 'EditedContract')


        // this.fetchContractsDetailsById(ContractDetailsId)
        // console.log(this.contractEditDetailForm.value, "contractDetailsEditForm");
        this.fetchRelatedContractsDetails(response.ContractId)
      });

    console.log("editedWorked", this.contractEditDetailForm.value)

    this.toastr.success("ContractDetails updated successfully");



  }


  updateDetails(ContractDetailsId: any) {

    console.log(ContractDetailsId, "ContractDetailsId Edit");

    this.apiService
      .getOneContractDetailsById(ContractDetailsId)
      .subscribe((response) => {
        console.log(response, 'thursday')


        this.contractDetailList.push(response);
        console.log("contract", response);

        for (const mm of this.contractDetailList) {
          this.contractEditDetailForm.patchValue({
            ContractId: mm.ContractId,
            ContractDetailsId: mm.ContractDetailsId,

            ContractDetailNo: mm.ContractDetailNo,
            status: mm.status,
            BookingType: mm.BookingType,
            vehicleType: mm.vehicleType,
            Transmission: mm.Transmission,
            NoOfVehicles: mm.NoOfVehicles,
            ServiceFromDate: mm.ServiceFromDate,
            ServiceToDate: mm.ServiceToDate,
            ChargeType: mm.ChargeType,
            ChargeAmount: mm.ChargeAmount,
            ChargeCurr: mm.ChargeCurr,
            every: mm.every,
            day: mm.day,
            week: mm.week,
            month: mm.month,
            frequency: mm.frequency,
            interval: mm.interval

          });
        }
      });




    console.log("editedWorked", this.contractEditDetailForm.value)


  }


  openEditDetails(EditDetailsForm: any) {

    this.modalService.open(EditDetailsForm, { size: "lg" }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );


  }

  getRelatedCharges(contractId: any): void {
    this.fetchRelatedContractsDetails(contractId);
    this.ChargeCurrData = []; // Initialize an empty array to store related currencies

    this.apiService.getRelatedCharge(contractId).subscribe((res: any) => {
      this.ChargeCurrData.push(res); // Add related currency data to the array
      console.log(this.ChargeCurrData[0], 'fetched currency'); // Log the first related currency (for debugging)

      // Update the form control value
      this.contractDetailForm.patchValue({
        ChargeCurr: this.ChargeCurrData[0].currencyCode, // Assuming res has a property named 'currencyCode'
      });
    });
  }

  getRelatedChargeType(ContractId: any): void {
    this.chargeTypeData = [];

    this.apiService.getRelatedChargeType(ContractId).subscribe((Type: any) => {

      for (const at of Type) {
        this.chargeTypeData.push(at);
        // this.contractDetailForm.patchValue({
        //   ChargeType: this.chargeTypeData[0].code,
        // });
      }
      console.log(Type, 'fetched ChargeType');





    });
  }



  

  openContract(contract: any) {

    this.modalService.open(contract, { size: "lg" }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }
  openEditContract(contract: any) {
    this.modalService.open(contract, { size: "lg" }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }


}
function selectedFrequency() {
  throw new Error('Function not implemented.');
}

