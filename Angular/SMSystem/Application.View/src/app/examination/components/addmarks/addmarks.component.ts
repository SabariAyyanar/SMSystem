import { Component, OnInit, Inject } from '@angular/core';
import { Student, Exam, Mark } from '../../../models/studentmodel';
import { StudentClass, Department, StudentSubject } from '../../../models/collections';
import { CollectionService } from '../../../service/collections.required';
import { StorageService } from '../../../service/storage.service';
import { StudentService } from '../../../service/student.service';
import { ExternalService } from '../../../service/external.service';
import { Observable } from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import { map } from 'rxjs/operator/map';
import { GridDataResult } from '@progress/kendo-angular-grid/dist/es/data/data.collection';
import { PageChangeEvent } from '@progress/kendo-angular-grid/dist/es/data/change-event-args.interface';
import { EditService } from '../../../service/exam.service';
import { State,process } from '@progress/kendo-data-query';
import {FormArray,FormBuilder,FormGroup,Validators,FormControl} from '@angular/forms';

@Component({
  selector: 'app-addmarks',
  templateUrl: './addmarks.component.html',
  styleUrls: ['./addmarks.component.scss']
})
export class AddmarksComponent implements OnInit {

  //initialize variable with some data
  allstudents:Student[] = this.studentService.getAllStudent();
  kendocombostudents:Student[] = this.studentService.getAllStudent();
  allclasses:StudentClass[] = this.collectionservice.getAllStudentClasses();     
  alldepartments:Department[] = this.collectionservice.getAllDepartments();
  allsubjects:StudentSubject[] = this.collectionservice.getAllStudentSubjects();
  allexams:Exam[] = this.studentService.getAllExam();
  currentexamincontext:Exam = new Exam();
  currentclassincontext:StudentClass = new StudentClass();
  currentstudentincontext:Student = new Student();
  searchstudentresult:Student[];
  search:any = {studentclass:'',department: '',name: ''}
  
  public formGroup: FormGroup;
  private heroform:FormGroup;
  
  private gridView: GridDataResult;
  isUpdate:boolean = false;

  constructor(private editService: EditService,
    public studentService:StudentService,
    private storageService:StorageService,private fb:FormBuilder,
    private collectionservice:CollectionService,private externalService:ExternalService) { 
      this.loadPrequisiteData();
      this.buildform();

    }
    public view: Observable<GridDataResult>;
    public gridState: State = {
        sort: [],
        skip: 0,
        take: 10
    };

  ngOnInit() {
    this.view = this.editService.map(data => process(data, this.gridState));    
    this.editService.read();
  }

    loadPrequisiteData(){
      if(!this.allsubjects){
        this.getAllStudentSubjectFromDatabase();
       }

      if(!this.alldepartments){
        this.getAllDepartmentFromDatabase();
       }
  
      if(!this.allclasses){
       this.getStudentClassFromDatabase();
      }
  
       if(!this.allstudents){
        this.getAllStudentFromDatabase();
       }
  
  }

  buildform(){
    this.isUpdate = false;
    this.heroform = this.fb.group({
      exammarks: this.fb.array([])
    })
  }

  SetForm(classsubjects:StudentSubject[]){
    this.currentexamincontext.marks = [];
    Array.from(Array(classsubjects.length),(_,x) =>{
    this.currentexamincontext.marks[x] = new Mark();
    this.currentexamincontext.marks[x].examId = null;
    this.currentexamincontext.marks[x].exam = null;
    this.currentexamincontext.marks[x].studentsubjectId = classsubjects[x].Id;
    this.currentexamincontext.marks[x].studentsubject = classsubjects[x];
    this.currentexamincontext.marks[x].mark = 0});

    const exams = this.currentexamincontext.marks.map(defaultmark=>this.fb.group(defaultmark));

    const addressArra = this.fb.array(exams);
    this.isUpdate = false;
    this.heroform.setControl('exammarks',addressArra);
  }

  SetFormForUpdate(classsubjects:StudentSubject[],examtoupdate:Exam){
    this.currentexamincontext = examtoupdate;
    
    Array.from(Array(classsubjects.length),(_,x) =>{
      this.currentexamincontext.marks[x].studentsubjectId = classsubjects[x].Id;
      this.currentexamincontext.marks[x].studentsubject = classsubjects[x];});
    const exams = this.currentexamincontext.marks.map(defaultmark=>this.fb.group(defaultmark));

    const addressArra = this.fb.array(exams);
    this.isUpdate = true;
    this.heroform.setControl('exammarks',addressArra);
  }

  public editHandler({sender, rowIndex, dataItem}) {
    if(dataItem.student.studentclassId){
    this.currentstudentincontext = dataItem.student;
    this.setClass(dataItem.student.studentclassId);
    this.search.studentclass = dataItem.student.studentclassId;
    this.search.department = dataItem.student.departmentId;
    this.search.name = dataItem.student;
    this.SetFormForUpdate(this.currentclassincontext.classsubjects,dataItem);
    }
 
 }

 kendoComboValueChange(event){
    this.setClass(event.studentclassId);
    this.search.studentclass = event.studentclassId;
    this.search.department = event.departmentId;
    this.SetForm(this.currentclassincontext.classsubjects);
 }

 setCurrentClass(){
   if(this.currentstudentincontext){
  this.setClass(this.search.studentclass);
  this.SetForm(this.currentclassincontext.classsubjects);
   }
}

 setClass(id:number){
  if(id){
  let n =  this.storageService.SearchIndexPosition(id,this.allclasses);
  this.currentclassincontext = this.allclasses[n];
  }
}

  get exammarks():FormArray{
    return this.heroform.get('exammarks') as FormArray;
  }

  saveNewExam(){
    if(this.editService.SearchIFExamScoreExistForStudent(this.search.name.Id)){
      this.storageService.openSnackbarForSuccess("Score Already Exist For Student");
      return;
    }
    else{
    this.currentexamincontext.Id = null;
    this.currentexamincontext.studentId = this.search.name.Id;
    this.currentexamincontext.student = null;
    this.currentexamincontext.marks = this.exammarks.value;
    this.editService.save(this.currentexamincontext,true);
    this.storageService.openSnackbarForSuccess("Saved");
    this.clearInputFields();
    this.buildform();
    }
  }

  updateOldExam(){
    this.currentexamincontext.marks = this.exammarks.value;
    this.editService.save(this.currentexamincontext,false);
    this.storageService.openSnackbarForSuccess("Updated");
    this.buildform();
  }

  cancelOldExam(){
    this.clearInputFields();
    this.buildform();
  }

  filterstudent(val:string){
    return this.allstudents
            .filter(e=>e.firstname.toLowerCase().indexOf(val.toLowerCase())===0);
  }

  
  
  handleFilter(value) {
    if(this.searchstudentresult){
      this.kendocombostudents= this.searchstudentresult.filter((s) => s.firstname.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
    else{
      this.kendocombostudents = this.allstudents.filter((s) => s.firstname.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
}

  public onStateChange(state: State) {
    this.gridState = state;

    this.editService.read();
}





public removeHandler({dataItem}) {
    this.editService.remove(dataItem);
}

  
      //Loading data from database if variable data from storage
      //has not been loaded yet
  
      getAllStudentFromDatabase(){
        this.studentService.GetAllStudent()
        .subscribe((response)=>{this.allstudents = response,this.kendocombostudents=response;},
        (err)=>{this.externalService.logError(err)});
      }
  
      getStudentClassFromDatabase(){
        this.collectionservice.GetAllStudentClasses()
        .subscribe((response)=>this.allclasses = response,
        (err)=>{this.externalService.logError(err)});
      }
  
  
      getAllDepartmentFromDatabase(){
        this.collectionservice.GetAllDepartments()
        .subscribe((response)=>this.alldepartments = response,
        (err)=>{this.externalService.logError(err)});
      }

      getAllStudentSubjectFromDatabase(){
        this.collectionservice.GetAllStudentSubjects()
        .subscribe((response)=>this.allsubjects = response,
        (err)=>{this.externalService.logError(err)});
      }

      
    

      filterobject(){        
        if(this.search.studentclass.toString() ==="" && this.search.department.toString()==="" &&
         this.search.name.toString()===""){
          this.clearInputFields();
          return;
        } 
       var re = new RegExp(this.search.name),Key;
       if(this.allstudents){
        this.searchstudentresult =  this.allstudents.filter(e => {
             return e.studentclassId.toString().includes(this.search.studentclass)
              && e.departmentId.toString().includes(this.search.department)
              && re.test(e.firstname + ' ' + e.lastname);
         });
       }
       if(this.searchstudentresult[0]){
         this.kendocombostudents = this.searchstudentresult;
         this.currentstudentincontext = this.searchstudentresult[0];
         this.search.name = this.currentstudentincontext;
       }
       else{
         this.currentstudentincontext = new Student();
       }
      }
   
      clearInputFields(){
        this.search.studentclass = "";
        this.search.department = "";
        this.search.name = "";
        this.isUpdate = false;
        this.currentclassincontext = new StudentClass();
        this.currentstudentincontext = new Student();
      }

}
