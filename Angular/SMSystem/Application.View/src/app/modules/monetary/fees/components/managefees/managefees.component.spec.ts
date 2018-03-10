import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagefeesComponent } from './managefees.component';

describe('ManagefeesComponent', () => {
  let component: ManagefeesComponent;
  let fixture: ComponentFixture<ManagefeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagefeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagefeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
