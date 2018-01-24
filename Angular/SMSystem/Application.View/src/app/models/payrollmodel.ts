import {Student} from '../models/studentmodel'
import { Employee } from './employeemodel';

export class PayrollRate{
    constructor(
        public Id?:number,
        public workday:number = 0,
        public workdayovertime:number = 0,
        public saturday:number = 0,
        public saturdayovertime:number = 0,
        public sunday:number = 0,
        public sundayovertime:number = 0,
        public holiday:number = 0,
        public holidayovertime:number = 0,
        public IsTerminated:boolean = false,
    ){

    }
}

export class TaxRate{
    constructor(
        public Id ?:number,
        public name ?:string,
        public amount:number = 0,
        public rate?:number,
        public IsTerminated:boolean = false,
    ){

    }
}




export class SSNITRate{
    constructor(
        public Id?:number,
        public name?:string,
        public Rate?:number,
        public IsTerminated:boolean = false,
    ){

    }
}


export class PayrollHour{
    constructor(
        public workday:number = 0,
        public workdayovertime:number =0,
        public saturday:number = 0,
        public saturdayovertime:number =0,
        public sunday:number = 0,
        public sundayovertime:number = 0,
        public holiday:number =0,
        public holidayovertime:number =0,
        public IsTerminated:boolean = false,
    ){

    }
}

export class PayrollAllowance{
    constructor(
        public Id ?:number,
        public name ?:string,
        public amount:number = 0,
        public IsTerminated:boolean = false,
    ){

    }
}

export class Allowance{
    constructor(
        public Id ?:number,
        public payrollallowanceId?:number,
        public payrollallowance?:PayrollAllowance,
        public payrollamountId?:number,
        public payrollamount?:PayrollAmount,
        public amount:number = 0,
        public IsTerminated:boolean = false,
    ){

    }
}

export class PayrollDate{
    constructor(
        public Id ?:number,
        public startdate?:Date,
        public enddate?:Date,
        public numberofdays ?:number,
        public IsTerminated:boolean = false,
    ){

    }PayrollDate
}

export class PayrollAmount{
    constructor(
        public Id?:number,        
        public employeeId:number = 0,
        public employee:Employee= new Employee(),
        public workday:number = 0,
        public workdayovertime:number = 0,
        public saturday:number = 0,
        public saturdayovertime:number = 0,
        public sunday:number = 0,
        public sundayovertime:number = 0,
        public holiday:number = 0,
        public holidayovertime:number = 0,
        public payee:number = 0,
        public ssnit:number = 0,
        public loan:number = 0,
        public allowances:Allowance[] = [],
        public totalallowance:number = 0,
        public grosssalary:number = 0,
        public netsalary:number = 0,
        public totalworkdays:number = 0,
        public expectedworkhours:number = 0,
        public startdate:Date = new Date(),
        public enddate:Date = new Date(),
        public IsTerminated:boolean = false
    ){

    }
}

export class EmployeeLoan{
    constructor(
        public Id:number = 0,
        public amount:number = 0,
        public amountowing:number = 0,
        public amountpaid:number = 0,
        public interestrate:number = 0,
        public interestamount:number = 0,
        public monthlypayment:number = 0,
        public loandate:Date = new Date(),
        public employeeId:number =0,
        public employee:Employee = new Employee(),
        public IsTerminated:boolean = false,
    ){

    }
}

export class EmployeeLoanHistory{
    constructor(
        public Id:number = 0,
        public amount:number =0,
        public paymentdate:Date = new Date(),
        public employeeloanId:number =0,
        public employeeloan:EmployeeLoan = new EmployeeLoan(),
        public IsTerminated:boolean = false,
    ){

    }
}