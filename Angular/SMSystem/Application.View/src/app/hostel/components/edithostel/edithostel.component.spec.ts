import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdithostelComponent } from './edithostel.component';

describe('EdithostelComponent', () => {
  let component: EdithostelComponent;
  let fixture: ComponentFixture<EdithostelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdithostelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdithostelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
