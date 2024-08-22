import { Component,inject, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ModalDismissReasons,
  NgbDatepickerModule,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-vehicle-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css'],
})
export class VehicleDetailsComponent {
  private modalService = inject(NgbModal);
  closeResult = '';

  openLg(content: TemplateRef<any>) {
		this.modalService.open(content, { size: 'lg' })

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
        return '';
      case ModalDismissReasons.BACKDROP_CLICK:
        return '';
      default:
        return `: ${reason}`;
    }
  }
}
