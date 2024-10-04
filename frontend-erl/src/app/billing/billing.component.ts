import { Component, inject, TemplateRef } from '@angular/core';
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
  companyForm: FormGroup;
  tripInfo: any;
  serviceInfo: any = '';
  getDismissReason: any;
  private modalService = inject(NgbModal);
  // searchForm:FormGroup;
  errorMessage: string = '';  // Error message for selecting multiple rows
  companyName: string = '';
  isCompanySelectionModalOpen: boolean = false;
  selectedBillings: Set<any> = new Set(); // Keep track of selected billings
  nameVar: any;
  classVar: any;
  ageVar: any;
  TripStatus: any;
  languageVar: any;
  companiesData: any;
  bookingStatusData: any;
  bookingSourceData: any;
  bookingBranchData: any;
  bookingChargeData: any;
  bookingTypesData: any;
  relatedCustCode: any;
  relatedCustName: any;
  filteredBillings: any;
  isCompanySelected: boolean = false;



  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private toastr: ToastrService,
    private actRoute: ActivatedRoute,
    private router: Router

  ) {
    this.billingDetails = []
    this.tripInfo = []
    this.billingForm = this.formBuilder.group({})
    this.bookingInfo = []
    this.companiesData = [];
    this.relatedCustCode = [];
    this.relatedCustName = [];
    this.bookingTypesData = [];


    this.companyForm = this.formBuilder.group({
      companyName: [""],
      CompanyCode: [""]

    })

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
      autoWidth: true,




    }



    this.apiService.fetchAllTrips().subscribe((bills: any[]) => {
      this.completedBillings = bills
      //  this.completedBillings = bills.filter(resv =>{
      //   return resv.TripStatus ==='Completed'

      //  });
    })


    // this.apiService.fetchAllTransactions().subscribe((res: any) => {
    //   console.log(res, 'the vehicleouts/in');
    //   this.completedBillings =(res)
    //   // this.completedBillings = res.filter((t: any) => t.tripStatus === 'Completed' && t.MileageIN > 0 && t.FuelIN > 0);
    //   console.log(this.completedBillings, 'completed billings');
    // });



    this.apiService.getCompanies().subscribe((company: any) => {
      for (const c of company) {
        this.companiesData.push(c);
      }
    })
    this.apiService.getBookingCategories().subscribe((categories: any) => {
      for (const a of categories) {
        this.bookingChargeData.push(a);
      }
    });
    this.apiService.getBookingTypes().subscribe((BookingType: any) => {
      for (const b of BookingType) {
        this.bookingTypesData.push(b);
      }
    });













  }

  getRelatedCustCode(name: any) {
    this.relatedCustCode = [];
    this.apiService.getRelatedCustCode(name).subscribe((custCode: any) => {
      for (const bb of custCode) {
        this.relatedCustCode.push(bb);
        this.companyForm.patchValue({
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
        this.companyForm.patchValue({
          companyName: this.relatedCustName[0].Name,
        });
      }
    });
  }




  searchFilter() {
    this.completedBillings = [];

    let filterObject: any = {
      name: this.nameVar.nativeElement.value,
      class: this.classVar.nativeElement.value,
      age: this.ageVar.nativeElement.value,
      trip: this.TripStatus.nativeElement.value,
      language: this.languageVar.nativeElement.value,
    };
    for (let i = 0; i < this.completedBillings.length; i++) {
      let isStringExist;
      for (let key in filterObject) {
        if (key == 'age') {
          isStringExist =
            this.completedBillings[i][key]
              .toString()
              .indexOf(filterObject[key]) > -1;
        } else {
          isStringExist =
            this.completedBillings[i][key]
              .toUpperCase()
              .indexOf(filterObject[key].toUpperCase()) > -1;
        }
        if (isStringExist == false) {
          break;
        }
      }
      if (isStringExist) {
        this.completedBillings.push(this.completedBillings[i]);
      }
    }
  }



  selectAll(event: any) {
    const checked = event.target.checked;
    if (checked) {
      // Select all rows
      this.completedBillings.forEach((billing: any) => this.selectedBillings.add(billing));
    } else {
      // Deselect all rows
      this.selectedBillings.clear();
    }
  }


  processBtn = false
  onRowCheckboxChangez(event: any, billing: any) {
    const checked = event.target.checked;
    if (checked) {
      this.selectedBillings.add(billing); // Add row to the selected set
    } else {
      this.selectedBillings.delete(billing); // Remove row from the selected set
    }

    setTimeout(() => {
      this.processBtn = true

    }, 1000)

  }
  onRowCheckboxChange(event: any, billing: any): void {
    if (event.target.checked) {
      this.selectedBillings.add(billing);  // Add selected billing to the set
    }
    setTimeout(() => {
      // this.processBtn = true

    }, 1000)


    // Check if more than one row is selected
    if (this.selectedBillings.size > 1 && !this.isCompanySelected) {
      this.processBtn = true

      this.isCompanySelectionModalOpen = true; // Open the company selection modal
    } else {
      this.isCompanySelectionModalOpen = false; // Close the modal if conditions are not met
    }
  }


  selectCompany(): void {

    if (this.companyName) {
      this.isCompanySelectionModalOpen = false;
      this.errorMessage = '';
      console.log('Company chosen:', this.companyName);
    } else {
      this.errorMessage = 'You must choose a company to proceed.';
    }
  }


  isSelected(billing: any): boolean {
    return this.selectedBillings.has(billing);
  }
  // this.apiService.fetchResvTrip(this.ReservationId).subscribe((res) => {
  //   this.bookingInfo = (res)

  // })



  save() {
    console.log('companyform:', this.companyForm.value);
    const selectedCompanyCode = this.companyForm.get('CompanyCode')?.value;

    if (selectedCompanyCode) {
      // Filter bills by the selected company code
      this.filteredBillings = this.completedBillings.filter((bill: { companyCode: any; }) => bill.companyCode === selectedCompanyCode);


      // Output the filtered bills to the console (optional)
      console.log('Filtered Bills:', this.filteredBillings);

      // Close the modal after filtering
      this.isCompanySelectionModalOpen = false;
      this.isCompanySelected = true;
    } else {
      console.error('Company code is missing.');
    }


  }


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
    })
  }


  loaderVisible = false;
  processSelectedRows() {
    const confirmBill = window.confirm('Do you wish to bill the selected Trips?')

    if (confirmBill) {
      this.loaderVisible = true;

      setTimeout(() => {
        this.router.navigate([`BillingDetails/${this.ReservationId}`]);

      }, 2000);


    }
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

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }
























}
