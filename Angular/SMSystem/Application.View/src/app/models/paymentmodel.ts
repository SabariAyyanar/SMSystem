import {Student} from '../models/studentmodel'

export class Payment{
    constructor(
        public Id?:number ,
        public amounttopay?:number,
        public amountpaid?: number,
        public amountowing?:number,
        public studentId?:number,
        public student?:Student,
        public IsTerminated:boolean = false,
    ){

    }
}

export class PaymentHistory{
    constructor(
        public Id?:number ,
        public amount?:number,
        public amountinwords?:string,
        public paymentdate?:Date,
        public studentId?:number,
        public student?:Student,
        public IsTerminated:boolean = false,
    ){

    }
}