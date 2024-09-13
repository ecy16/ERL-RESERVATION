import { Component, inject, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ApiService } from 'src/app/api.services';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, NgFor } from "@angular/common";
import { ReactiveFormsModule } from '@angular/forms';
import { FileUploadService } from 'fileUpload.service';
import { MatIconModule } from "@angular/material/icon";




@Component({
	standalone: true,
	selector: 'app-drivers',
	templateUrl: './drivers.component.html',
	styleUrls: ['./drivers.component.css'],
	imports: [FormsModule, CommonModule, NgFor, ReactiveFormsModule, MatIconModule]

})
export class DriversComponent {
	private modalService = inject(NgbModal);
	closeResult = '';

	OurDriversForm: FormGroup;
	DriversList: any;
	selectedFile: File | null = null;
	searchDriverForm: FormGroup;


	constructor(
		private formBuilder: FormBuilder,
		private apiService: ApiService,
		private toastr: ToastrService,
		private actRoute: ActivatedRoute,
		private fileUploadService: FileUploadService
	) {


		this.DriversList = [];


		this.OurDriversForm = this.formBuilder.group({
			DriverFirstName: [""],
			DriverLastName: [""],
			DriverDOB: [""],
			DriverLicenseNo: [""],
			DriverLicenseIssue: [""],
			DriverLicenseExpiry: [""],
			Nationality: [""],
			IDPP: [""],
			IDPPExpiry: [""],
			CountryOfIssue: [""],
			CountryOfResidence: [""],
			AddressLine1: [""],
			AddressLine2: [""],
			AddressLine3: [""],
			ContactNo: [""],
			Email: [""],
			NextOfKinName: [""],
			NextOfKinContactNo: [""],
			BookingRemarks: [""],
			ReservationId: "",
		});
		this.searchDriverForm = this.formBuilder.group({
			DriverFirstName: [""],
			DriverLicenseNo: [""],
			ContactNo: [""],

		})
	}
	ngOnInit() {
		this.fetchAllChauffers();
		this.apiService.getAllChauffers().subscribe((response) => {
			this.DriversList.push(response);
			console.log(response, "DriversChauffer:");
		});
	}


	addChauffer() {
		console.log("Chaufeer:");


		this.DriversList = []
		JSON.stringify(this.OurDriversForm.value,);
		console.log(this.OurDriversForm.value, "DriversList:");

		this.apiService.addChaufferDriver(this.OurDriversForm.value).subscribe(() => {
			this.DriversList.push(this.OurDriversForm.value)
		});
		this.fetchAllChauffers();
	}


	fetchAllChauffers() {
		this.DriversList = [];
		this.apiService.getAllChauffers().subscribe((chauffer) => {
			this.DriversList.push('chauffer', chauffer);
			this.DriversList = chauffer
		});
	}


	searchingDriver(){
		this.DriversList = [];
		console.log(this.searchDriverForm.value, 'Driver values');
	  
		this.apiService.searchChauffer(this.searchDriverForm.value).subscribe(
			(res: any[]) => {
				console.log(res, 'response from API');
				this.DriversList = res;
			},
			(error) => {
				console.error('Error fetching Driver results', error);
			}
		);
		console.log(this.DriversList, 'Drivers filetered');
	  }





	open(content: TemplateRef<any>) {
		this.modalService.open(content, { size: "lg" }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},

		);
	}
	openEdit(Driver: TemplateRef<any>) {
		this.modalService.open(Driver, { size: "lg" }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},

		);
	}

	onFileChange(event: Event): void {
		const input = event.target as HTMLInputElement;
		if (input.files && input.files.length > 0) {
			this.selectedFile = input.files[0];
		}
		console.log('files uploaded', this.selectedFile)
	}
	submitForm(): void {
		if (!this.selectedFile) {
			console.log('No file selected');
			return;
		}

		this.fileUploadService.uploadFile(this.selectedFile).subscribe(
			response => {
				console.log('Response:', response);
			},
			err => {
				console.error('Error:', err);
			}
		);
	}
}
