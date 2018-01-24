import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { StudentService } from './student.service';
import { Student, Exam } from '../models/studentmodel';

const CREATE_ACTION = 'create';
const UPDATE_ACTION = 'update';
const REMOVE_ACTION = 'destroy';

@Injectable()
export class EditService extends BehaviorSubject<Exam[]> {
    constructor(private http: HttpClient,private studentService:StudentService) {
        super([]);
    }

    private allexams: Exam[] = [];

    public read() {
        if (this.allexams.length) {
            return super.next(this.allexams);
        }

        this.fetch()
            .do(data => {
                this.allexams = data;
            })
            .subscribe(data => {
                super.next(data);
                
            });
    }

    public save(student: Exam, isNew?: boolean) {
        const action = isNew ? CREATE_ACTION : UPDATE_ACTION;

        this.reset();

        this.fetch(action, student)
    }

    public remove(studenttoremove: Exam) {
        this.reset();

         this.fetch(REMOVE_ACTION, studenttoremove)
    }

    public resetItem(studenttoreset: Exam) {
        if (!studenttoreset) { return; }

        // find orignal data item
        const originalstudent = this.allexams.find(item => item.Id === studenttoreset.Id);

        // revert changes
        Object.assign(originalstudent, studenttoreset);

        super.next(this.allexams);
    }

    SearchIFExamScoreExistForStudent(itemToSearch:any):boolean{      
        for(var key in this.allexams){
          console.log(this.allexams[key].studentId);
            if(this.allexams[key].studentId === itemToSearch){
              return true;
            }
        }
        return false
      }

    private reset() {
        this.allexams = [];
    }

    private fetch(action: string = '', data?: Exam): Observable<Exam[]>  {
        if(action == CREATE_ACTION){
            this.studentService.AddExam(data)
            .subscribe(()=> {this.reset();this.read()})
        }
        else if(action == UPDATE_ACTION){
            this.studentService.UpdateExam(data)
            .subscribe(()=> {this.reset();this.read()})
        }
        else if(action == REMOVE_ACTION){
            this.studentService.RemoveExam(data)
            .subscribe(()=> {this.reset();this.read()})
        }
        else
        return this.studentService.GetAllExam()
        .map(res => <Exam[]>res);
    }


}