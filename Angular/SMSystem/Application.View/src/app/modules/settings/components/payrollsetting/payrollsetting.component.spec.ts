import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollsettingComponent } from './payrollsetting.component';

describe('PayrollsettingComponent', () => {
  let component: PayrollsettingComponent;
  let fixture: ComponentFixture<PayrollsettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollsettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollsettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
