import { Component, inject, NgModule, TemplateRef } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import {
  ModalDismissReasons,
  NgbDatepickerModule,
  NgbModal,
} from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from "@angular/forms";
// import { ApiService } from "src/app/api.services-old";
import { NgFor } from "@angular/common";
import { ApiService } from "src/app/api.services";
import { MatIcon } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { HttpClient, HttpEventType } from "@angular/common/http";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { CommonModule } from "@angular/common";
import { DataTablesModule } from "angular-datatables";
import { MatPaginatorModule } from "@angular/material/paginator";
import { image } from "html2canvas/dist/types/css/types/image";
import { FileUploadService } from "fileUpload.service";
import * as moment from "moment";



@Component({
  standalone: true,
  selector: "app-vehicles",
  templateUrl: "./vehicles.component.html",
  imports: [
    NgbDatepickerModule,
    ReactiveFormsModule,
    NgFor,
    RouterModule,
    MatIconModule,
    MatProgressBarModule,
    CommonModule,
    DataTablesModule,
    MatPaginatorModule
  ],
  styleUrls: ["./vehicles.component.css"],
})
export class VehiclesComponent {
  private modalService = inject(NgbModal);
  closeResult = "";
  vehicleForm: FormGroup;
  uploadForm: FormGroup;
  uploadVehiclesForm: FormGroup;
  vehicleSearchForm: FormGroup;
  vehicleInspectionDate: any;
  docAttachments: any;
  fileName = "";
  uploadProgress: any;
  uploadSub: any;
  DocName: string | undefined;
  vehicleRegistrationList: any;
  vehicleMakeList: any;
  vehicleModelList: any;
  fetchModels: any;
  tripForm: any;
  VehiclesData: any;
  fetchedVehicleList: any;
  selectedFile: File | null = null;
  selectedImage: File | null = null;
  isLoading: boolean = false;



  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private fileUploadService: FileUploadService

  ) {
    this.vehicleForm = this.formBuilder.group({});

    this.docAttachments = [];
    this.uploadForm = this.formBuilder.group({
      imageFile: [""],
    });
    this.vehicleMakeList = [];
    this.vehicleModelList = [];
    // this.fetchedVehicleList=[];
    this.vehicleRegistrationList = [];
    this.VehicleData = [];
    this.vehicleForm = this.formBuilder.group({
      vehicleRegNo: [""],
      vehicleDescription: [""],
      engineCapacity: [""],
      vehicleOwner: [""],
      vehicleStatus: [""],
      VehicleMake: [""],
      VehicleModel: [""],
      vehicleColor: [""],
      vehicleType: [""],
      vehicleTransmission: [""],
      commissionDate: [""],
      chassisNumber: [""],
      vehicleInspectionDate: [""],
      vehicleInsuranceDate: [""],
      vehiclePSVDueDate: [""],
      File: [""]
    });
    this.vehicleSearchForm = this.formBuilder.group({
      vehicleRegNo: [""],
      VehicleMake: [""],
      VehicleModel: [""],
      vehicleStatus: [""],
      vehicleColor: [""],
      fromDate: [""],
      toDate: [""],


    });
    this.uploadVehiclesForm = this.formBuilder.group({
      file: [""],
      fileSource: [""]
    })
  }
  ngOnInit() {
    this.fetchAllVehicles()

    this.apiService.getVehicleRegistration().subscribe((vehicleReg) => {
      for (const f of vehicleReg) {
        this.vehicleRegistrationList.push(f);
      }
    });

    this.apiService.getVehicleMakeAll().subscribe((VehicleMake) => {
      for (const j of VehicleMake) {
        this.vehicleMakeList.push(j);
      }
    });

    this.apiService.getVehicleRegistration().subscribe((vehicleReg) => {
      for (const f of vehicleReg) {
        this.vehicleRegistrationList.push(f);
      }
    });
    const BookingDateSX = moment(new Date()).format("YYYY-MM-DD")

    this.vehicleSearchForm.patchValue({
      fromDate: BookingDateSX,
      toDate: BookingDateSX,
      BookingStatus: "InProgress",


    });

  }

  saveVehicle() {
    this.VehicleData = [];
    JSON.stringify(this.vehicleForm.value);
    this.apiService.addVehicle(this.vehicleForm.value).subscribe(() => {
      this.VehicleData.push(this.vehicleForm.value);
    });
    console.log(this.vehicleForm.value, 'formVehicle');
    this.fetchAllVehicles();
    this.uploadDoc()
    this.uploadImg()
  }
  VehicleData: any[] = [];

  fetchAllVehicles() {
    this.VehicleData = [];
    this.apiService.getAllVehicles().subscribe((cars) => {
      this.VehicleData.push(cars, "CARS");
      this.VehiclesData = cars
    });
  }






  viewVehicle() {
    console.log("gggggggggggggggg");
  }
  fetchVehicleModels(VehicleMake: any) {
    // console.log(vehicleMake, "vehiclemake");

    // this.apiService.getVehicleModel(vehicleMake)
    this.apiService.getVehicleModel(VehicleMake).subscribe((VehicleModel) => {
      this.vehicleModelList = [];
      for (const g of VehicleModel) {
        this.vehicleModelList.push(g);
      }
      console.log(VehicleMake, "MAKE:");
    });
  }



  vehicleSearching() {
    this.VehiclesData = [];
    console.log(this.vehicleSearchForm.value, 'form values');

    this.apiService.searchVehicles(this.vehicleSearchForm.value).subscribe(
      (res: any[]) => {
        console.log(res, 'response from API');
        this.VehiclesData = res;
      },
      (error) => {
        console.error('Error fetching search results', error);
      }
    );
    console.log(this.VehiclesData, 'vehicles filetered');
  }

  onFileUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
    console.log('files uploaded', this.selectedFile)
  }


  uploadDoc() {
    if (!this.selectedFile) {
      console.log('No file selected');
      return;
    }

    this.fileUploadService.uploadVehicleDoc(this.selectedFile).subscribe(
      (response) => {
        console.log('Response:................the file', response);
        this.isLoading = false;

      },
      err => {
        console.error('Error:', err);
      }
    );
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

    this.fileUploadService.uploadVehicleDoc(this.selectedFile).subscribe(
      response => {
        console.log('Response:................the file', response);
      },
      err => {
        console.error('Error:', err);
      }
    );

  }

  filePath: string | null = null;

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.uploadVehiclesForm.patchValue({
        fileSource: file
      });
      this.filePath = input.value; 
    }
  }

  
  // vehicleFiles(){
  //   this.apiService.uploadVehicleFiles
  // }

  submit() {
    const formData = new FormData();
    formData.append('csv', this.uploadVehiclesForm.get('fileSource')!.value);

    try {
      this.apiService.importVehicles(formData).subscribe((data) => {
  
          alert("Data imported successfully")
        // }
        console.log(data, 'vehicle data')
      }
      )
    } catch (error) {
      console.log(error)
    }

  }


  openLg(content: TemplateRef<any>) {
    this.modalService
      .open(content, { size: "lg" })

      .result.then(
        (result) => {
          this.closeResult = ` ${result}`;
        },
        (reason) => {
          this.closeResult = ` ${this.getDismissReason(reason)}`;
        }
      );
  }
  openVedit(Vehicle: TemplateRef<any>) {
    this.modalService
      .open(Vehicle, { size: "lg" })

      .result.then(
        (result) => {
          this.closeResult = ` ${result}`;
        },
        (reason) => {
          this.closeResult = ` ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return "";
      case ModalDismissReasons.BACKDROP_CLICK:
        return "";
      default:
        return `with: ${reason}`;
    }
  }

}
function ngOnInit() {
  throw new Error("Function not implemented.");
}
