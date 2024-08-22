import { Component, inject, TemplateRef } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
// import { ApiService } from "src/app/api.services-old";
import { ApiService } from "src/app/api.services";

@Component({
  selector: "app-users-management",
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: "./users-management.component.html",
  styleUrls: ["./users-management.component.css"],
})
export class UsersManagementComponent {
  usersForm: FormGroup;
  usersData: any;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {
    this.usersForm = formBuilder.group({
      FullName: [""],
      username: [""],
      EmailAddress: [""],
      UserStatus: [""],
      password: [""],
      roles: [""],
      Department: [""],
    });
    this.usersData = [];
  }


ngOnInit(){
  this.fetchAllUsers()

}









  addUsers() {
    this.usersData=[]
    JSON.stringify(this.usersForm.value);
    console.log(this.usersForm.value,'usersss')
    this.apiService.addNewUser(this.usersForm.value).subscribe((res) => {
          this.usersData.push(res);
          console.log("bbbbbbbbbbb", res);
          this.fetchAllUsers()

    });
  }



  fetchAllUsers(){
    this.usersData=[]
    this.apiService.getAllUsers().subscribe((res)=>{
      this.usersData.push(res);
      this.usersData=res;
    })
  }


  private modalService = inject(NgbModal);
  closeResult = "";

  openLg(content: TemplateRef<any>) {
    this.modalService.open(content, { size: "lg" });
  }

  open(content: TemplateRef<any>) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
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
