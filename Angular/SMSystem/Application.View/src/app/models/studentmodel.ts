import { StudentSubject, StudentClass, Department, Region, StudentStatus } from "./collections";

export class Student{
    constructor(
        public Id?:number ,
        public gender?:string,
        public firstname?:string,
        public lastname?:string,
        public placeofbirth?:string,
        public dateofbirth?:Date,
        public studentclassId?:number,
        public studentclass?:StudentClass,
        public departmentId?:number,
        public department?:Department,
        public mothername?:string,
        public fathername?:string,
        public regionId?:number,
        public region?:Region,
        public city?:string,
        public address?:string,
        public email?:string,
        public phone?:string,
        public studentstatusId?:number, 
        public studentstatus?:StudentStatus, 
        public scholarshippercent?:number, 
        public imagesrc:any = '../../assets/images/default.png' ,
        public IsTerminated:boolean = false,
    ){

    }
}

export class Search{
    constructor(
           public studentclass?:number,
            department?:number,
            name?:string,
            public IsTerminated:boolean = false,
    ){

    }
}

export class Exam{
    constructor(
           public Id:number = 0,
           public studentId:number = 0,
           public student:Student = new Student(),
           public  marks:Mark[] = [],
           public IsTerminated:boolean = false,
    ){

    }
}

export class Mark{
    constructor(
           public Id:number = 0,
           public studentsubjectId:number =0,
           public studentsubject:StudentSubject = new StudentSubject(),
           public examId:number = 0,
           public exam:Exam = new Exam(),
           public mark:number = 0 ,
           public IsTerminated:boolean = false,
    ){

    }
}