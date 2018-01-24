import { EmployeeCategory, Department } from "./collections";

export class Employee{
    constructor(
        public Id?:number,
        public gender?:string,
        public firstname?:string,
        public lastname?:string,
        public fullname?:string,       
        public address?:string,
        public dateofbirth?:Date,
        public categoryId?:number,
        public category?:EmployeeCategory,
        public departmentId?:number,
        public department?:Department,       
        public mothername?:string,
        public fathername?:string,
        public regionId?:number,
        public city?:string,
        public placeofbirth?:string,
        public phone?:string,        
        public email?:string,
        public levelofeducationId?:number,
        public areaofexpertise?:string,
        public classtoteachId?:number,
        public yearsofexperience?:number,
        public salary?:number,
        public workinghours?:number,        
        public imagesrc:any= '../../assets/images/default.png',
        public employeetypeId?:number,
        public iscurrentpayrollamount:boolean=false,
        public IsTerminated:boolean = false,
){
    
        }
}

export class EmployeeDocument{
    constructor(
        public Id?:number ,
        public documentsrc?:any,
        public details?:string,
        public employeeId?:number,
        public employee?:Employee,
        public IsTerminated:boolean = false,
    ){

    }
}

export class EmployeeData{
    constructor(
        public employee?:Employee ,
        public employeedocument?:EmployeeDocument[],
    ){

}
}