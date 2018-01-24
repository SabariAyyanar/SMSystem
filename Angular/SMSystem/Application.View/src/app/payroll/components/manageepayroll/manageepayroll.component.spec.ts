import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageepayrollComponent } from './manageepayroll.component';

describe('ManageepayrollComponent', () => {
  let component: ManageepayrollComponent;
  let fixture: ComponentFixture<ManageepayrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageepayrollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageepayrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
