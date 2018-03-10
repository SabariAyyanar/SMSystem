import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeFeedingComponent } from './employee-feeding.component';

describe('EmployeeFeedingComponent', () => {
  let component: EmployeeFeedingComponent;
  let fixture: ComponentFixture<EmployeeFeedingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeFeedingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeFeedingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
