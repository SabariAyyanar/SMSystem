export class MailData{
    constructor(
        public email:string="" ,
        public subject:string ="",
        public message: string ="",
    ){

    }
}

export class SchoolInfo{
    constructor(
        public schoolname:string = "",
        public email:string = "",
        public password:string ="",
        public location: string ="",
        public address: string ="",
        public contactnumber: string =""
    ){

    }
}

export class EmailInfo{
    constructor(
        public deactivated:boolean =false,
        public studentemplateregistration:string="",
        public employeeemplateregistration:string="",
        public studentemplatefee: string="",
        public employeeemplatepayroll: string=""
    ){

    }
}

export class SMSInfo{
    constructor(
        public deactivated:boolean =false,
        public studentemplateregistration:string="",
        public employeeemplateregistration:string="",
        public studentemplatefee: string="",
        public employeeemplatepayroll: string=""
    ){

    }
}