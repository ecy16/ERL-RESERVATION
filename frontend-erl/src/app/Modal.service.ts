import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalTriggerSource = new Subject<any>(); // Can pass modal reference

  modalTrigger$ = this.modalTriggerSource.asObservable();

  // Method to trigger the modal
  open(addTrips: any) {
    this.modalTriggerSource.next(addTrips);
  }
}
