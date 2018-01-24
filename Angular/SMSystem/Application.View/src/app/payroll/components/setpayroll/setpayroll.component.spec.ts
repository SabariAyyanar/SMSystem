import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetpayrollComponent } from './setpayroll.component';

describe('SetpayrollComponent', () => {
  let component: SetpayrollComponent;
  let fixture: ComponentFixture<SetpayrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetpayrollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetpayrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
