import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentFeedingComponent } from './student-feeding.component';

describe('StudentFeedingComponent', () => {
  let component: StudentFeedingComponent;
  let fixture: ComponentFixture<StudentFeedingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentFeedingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentFeedingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
