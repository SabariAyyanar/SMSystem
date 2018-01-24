import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MydialogcomponentComponent } from './mydialogcomponent.component';

describe('MydialogcomponentComponent', () => {
  let component: MydialogcomponentComponent;
  let fixture: ComponentFixture<MydialogcomponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MydialogcomponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MydialogcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
