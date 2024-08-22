import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleDocumentsComponent } from './vehicle-documents.component';

describe('VehicleDocumentsComponent', () => {
  let component: VehicleDocumentsComponent;
  let fixture: ComponentFixture<VehicleDocumentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [VehicleDocumentsComponent]
    });
    fixture = TestBed.createComponent(VehicleDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
