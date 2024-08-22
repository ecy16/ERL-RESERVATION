/*import { Component, TemplateRef, inject } from "@angular/core";
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
} from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatStepperModule } from "@angular/material/stepper";
import { MatButtonModule } from "@angular/material/button";
import { CommonModule, NgIf } from "@angular/common";
import * as printJS from "print-js";
import { ApiService } from "../api.services";
import { MatIcon } from "@angular/material/icon";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-chauffer",
  templateUrl: "./chauffer.component.html",
  styleUrls: ["./chauffer.component.css"],
  standalone: true,

  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    CommonModule,
    NgIf,
    MatInputModule,
  ],
})
export class ChaufferComponent {
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

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private apiService: ApiService,
    private actRoute: ActivatedRoute


  ) {
    this.contracts = [];
    this.bookingTypesData = [];
    this.contractsData = []
    this.contractsResponse = []
    this.companiesData=[]
    this.relatedCustCode = [];

    this.billingDays = [];

    this.contractList = [];
    this.contractDetailList = [];
    this.contractsDetailsData = [];

    for (let i = 1; i <= 28; i++) {
      this.billingDays.push(i);
    }

    this.contractForm = this.formBuilder.group({

      ContractNo: ["", Validators.required],
      CustomerContractNo: ["", Validators.required],

      companyName: ["", Validators.required],
      CompanyCode: ["", Validators.required],
      StartDate: ["", Validators.required],
      EndDate: ["", Validators.required],
      BillingDay: ["", Validators.required],
      status: ['Active', Validators.required],
      ContractIdTemp: ["", Validators.required]




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
      Month: ["", Validators.required],
      frequency: [''],
      interval: ['']
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
      every: ["", Validators.required],
      day: ["", Validators.required],
      week: ["", Validators.required],
      Month: ["", Validators.required],
      frequency: [''],
      interval: ['']






    })





  }


  ngOnInit() {

    this.dtOptions = {
      order: [[1, 'desc']],
    }

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

  }
  get selectedFrequency() {
    return this.contractDetailForm.get('frequency')?.value;
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
          companyName:y.companyName ,
          CompanyCode:y. CompanyCode,
          StartDate: y.StartDate,
          EndDate: y.EndDate,
          BillingDay: y.BillingDay,
          ContractIdTemp: y.ContractId

        })

      }


      for (const x of this.contractsResponse) {
        this.contractDetailForm.patchValue({
          ContractId: x.ContractId,

        }
        )
        console.log('contractIID')

      }




      this.fetchAllContracts()
    })

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
    console.log('contractnavigation')
  }
  contractsDetailsData: any[] = []

  saveContractDetails() {
    JSON.stringify(this.contractDetailForm.value)
    console.log('Contract Details', this.contractDetailForm.value)

    this.apiService.addContractDetails(this.contractDetailForm.value).subscribe((res) => {
      this.fetchRelatedContractsDetails(this.contractDetailForm.value.ContractId)

    })



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
          CustomerContractNo:mm.CustomerContractNo,
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
          CustomerContractNo:["",Validators.required],
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
            every:mm. every,
            day: mm.day,
            week: mm.week,
            Month:mm.Month,
            frequency: mm.frequency,
            interval: mm.interval

          });
        }
      });




    console.log("editedWorked", this.contractEditDetailForm.value)


  }


  openEditDetails(EditDetailsForm: any) {

    this.modalService.open(EditDetailsForm, { size: "lg" }).result.then(
      (result: any) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason: any) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }



  openContract(contract: any) {

    this.modalService.open(contract, { size: "lg" }).result.then(
      (result: any) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason: any) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }
  openEditContract(contract: any) {
    this.modalService.open(contract, { size: "lg" }).result.then(
      (result: any) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason: any) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }


}
function selectedFrequency() {
  throw new Error('Function not implemented.');}*/

  import { Component, inject, TemplateRef,ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
  import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
  import { NgbAlert,NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
  
  
  @Component({
    selector: 'app-chauffer',
    standalone: true,
  imports:[NgbAlertModule,
    FormsModule,
    CommonModule,
  ],
    templateUrl: './chauffer.component.html',
  })
  export class ChaufferComponent {
    Makeoptions: any[] = [];
    ModelOptions: any[] = [];
    tableData: any[] = [];
    selectedMAKE: string = '';
    selectedModel: string = '';
    private modalService = inject(NgbModal);
    closeResult = '';
    /*@ViewChild ('selfClosingAlert',{static:false})selfClosingAlert!: NgbAlert;
   messageType: "success"|"failure"="success"
   constructor(){     }

   showAlert(messageType: 'success' | 'failure') {
    this.messageType = messageType;
    setTimeout(() => this.selfClosingAlert?.close(), 5000); // Alert will close after 5 seconds
  }

  showSuccess() {
    this.showAlert('success');
  }

  showFailure() {
    this.showAlert('failure');
  }*/
    constructor() {
      this.Makeoptions = [
        { value: 'Toyota', label: 'Toyota' },
        { value: 'Mercedes', label: 'Mercedes' },
        { value: 'Porsche', label: 'Porsche' },
        { value: 'BMW', label: 'BMW' },
        
      ];
      this.ModelOptions = [];

      
  

 }
 
 onMakeChange() {
  if (this.selectedMAKE === 'Toyota') {
      this.ModelOptions = [
          { value: 'Prado', label: 'Prado' },
          { value: 'Fielder', label: 'Fielder' },
          { value: 'Noah', label: 'Noah' },
          { value: 'LandCruiser', label: 'LandCruiser' }

      ];
  }
   else if 
   (this.selectedMAKE === 'BMW') {
      this.ModelOptions = [
          { value: '5 Series', label: '5 Series' },
          { value: '3 Series', label: '3 Series' },
          { value: 'X7', label: 'X7' },
          { value: 'X5', label: 'X5'},
          { value: 'X1', label: 'X1'}
      ];
  } 
  else if 
   (this.selectedMAKE === 'Porsche') {
      this.ModelOptions = [
          { value: 'Cayenne', label: 'Cayenne' },
          { value: 'Macan', label: 'Macan' }
      ];
  } 
  else
  (this.selectedMAKE === 'Mercedes') 
{
    this.ModelOptions = [
        { value: 'E350', label: 'E350' },
        { value: 'E300', label: 'E300' },
        { value: 'C250', label:'C250' },
        { value: 'C200', label: 'C200'},
        { value: 'S350', label: 'S350'}
    ];
} 
}
   

    open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'add-services' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
      );
    }
  
    saveData(form: any, modal: any) {
      if (form.valid) {
        const formData = {
          services: form.value.services,
          quantity: form.value.quantity,
          charge: form.value.charge
        };
        this.tableData.push(formData);
        modal.close("save click");
      }
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