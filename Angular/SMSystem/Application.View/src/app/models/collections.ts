
export class StudentClass{
    constructor(
        public Id?:number ,
        public name?:string,
        public classamounttopay?:number,
        public classsubjects?:StudentSubject[],
        public IsTerminated:boolean = false,
    ){

    }
}

export class StudentSubject{
    constructor(
        public Id?:number,
        public name?:string,
        public studentclassid?:number,
        public studentclass?:StudentClass,
        public IsTerminated:boolean = false,
    ){

    }
}

export class Department{
    constructor(
        public Id?:number ,
        public name?:string,
        public IsTerminated:boolean = false,
    ){

    }
}

export class Region{
    constructor(
        public Id?:number ,
        public name?:string,
        public IsTerminated:boolean = false,
    ){

    }
}

export class StudentStatus{
    constructor(
        public Id?:number ,
        public name?:string,
        public IsTerminated:boolean = false,
    ){

    }
}

export class EmployeeCategory{
    constructor(
        public Id?:number ,
        public name?:string,
        public allowancepercentage?:number,
        public IsTerminated:boolean = false,
    ){

    }
}

export class EmployeeLevelOfEducation{
    constructor(
        public Id?:number ,
        public name?:string,
        public IsTerminated:boolean = false,
    ){

    }
}

export class EmployeeType{
    constructor(
        public Id?:number ,
        public name?:string,
        public IsTerminated:boolean = false,
    ){

    }
}