import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChaufferComponent } from './chauffer.component';

describe('ChaufferComponent', () => {
  let component: ChaufferComponent;
  let fixture: ComponentFixture<ChaufferComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChaufferComponent]
    });
    fixture = TestBed.createComponent(ChaufferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
