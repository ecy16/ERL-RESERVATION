import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractIformationComponent } from './contract-information.component';

describe('ContractIformationComponent', () => {
  let component: ContractIformationComponent;
  let fixture: ComponentFixture<ContractIformationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContractIformationComponent]
    });
    fixture = TestBed.createComponent(ContractIformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
