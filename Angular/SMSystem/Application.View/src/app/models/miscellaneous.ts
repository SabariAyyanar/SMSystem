import {Student} from '../models/studentmodel'

export class Transport{
    constructor(
            public Id?:number,
            public IsTerminated:boolean = false,
    ){

    }
}

export class Hostel{
    constructor(
            public Id?:number,
            public name?:string,
            public location?:string,
            public rooms?:Room[],
            public IsTerminated:boolean = false,
    ){

    }
}

export class Room{
    constructor(
            public Id?:number,
            public hostelId?:number,
            public hostel?:Hostel,
            public name?:string,
            public costperroom?:number,
            public studentperroom?:number,
            public IsTerminated:boolean = false,
    ){

    }
}

export class Library{
    constructor(
            public Id?:number,
            public IsTerminated:boolean = false,
    ){

    }
}

export class Income{
    constructor(
            public Id?:number,
            public incomecategoryId?:number,
            public incomecategory?:string,
            public description?:string,
            public amount?:number,
            public dateofincome?:Date,
            public IsTerminated:boolean = false,
    ){

    }
}

export class IncomeCategory{
    constructor(
            public Id?:number,
            public name?:string,
            public IsTerminated:boolean = false,
    ){

    }
}

export class Expense{
    constructor(
            public Id?:number,
            public expensecategoryId?:number,
            public expensecategory?:string,
            public description?:string,
            public amount?:number,
            public dateofexpense?:Date,
            public IsTerminated:boolean = false,
    ){

    }
}

export class ExpenseCategory{
    constructor(
            public Id?:number,
            public name?:string,
            public IsTerminated:boolean = false,
    ){

    }
}

export class Book{
    constructor(
            public Id?:number,
            public IsTerminated:boolean = false,
    ){

    }
}



export class BookType{
    constructor(
            public Id?:number,
            public IsTerminated:boolean = false,
    ){

    }
}