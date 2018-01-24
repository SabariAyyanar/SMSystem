using BusinessEntity;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Application.Repository
{
    public class PlutoDbContextSeed : DropCreateDatabaseIfModelChanges<PlutoContext>
    {
        protected override void Seed(PlutoContext context)
        {
            AppUser appuser1 = new AppUser
            {
                username = "sa",
                password = "sa",
                email = "emmanuelansah247@gmail.com",
                alterEgo = "Admin"

            };


            Department department1 = new Department()
            {
                Id = 1,
                name = "Business"
            };

            Department department2 = new Department()
            {
                Id = 2,
                 name = "Science"
            };

            StudentClass studentclass1 = new StudentClass()
            {
                Id = 1,
                name = "One",
                classamounttopay = 20,
                IsTerminated = false
                
            };

            StudentClass studentclass2 = new StudentClass()
            {
                Id = 2,
                name = "Two",
                classamounttopay = 30,
                IsTerminated = false
            };

            StudentStatus studentstatus1 = new StudentStatus()
            {
                Id = 1,
                name = "Full Payment"
            };

            StudentStatus studentstatus2 = new StudentStatus()
            {
                Id = 2,
                name = "Partial Payment"
            };

            Region region1 = new Region()
            {
                Id = 1,
                name = "Ashanti"
            };

            Region region2 = new Region()
            {
                Id = 2,
                name = "Grater Accra"
            };

            EmployeeCategory employeecategory1 = new EmployeeCategory()
            {
                Id = 1,
                name = "Fixed",
                allowancepercentage = 70
            };

            EmployeeCategory employeecategory2 = new EmployeeCategory()
            {
                Id = 2,
                name = "Variable",
                allowancepercentage = 50
            };
            EmployeeLevelOfEducation employeelevelofeducation1 = new EmployeeLevelOfEducation()
            {
                Id = 1,
                name = "BSC"
            };

            EmployeeLevelOfEducation employeelevelofeducation2 = new EmployeeLevelOfEducation()
            {
                Id = 2,
                name = "MBS"
            };

            PayrollRate payrollrate = new PayrollRate()
            {
                workday = 100,workdayovertime=120,saturday=140,saturdayovertime=150,sunday=160,sundayovertime=160,holiday=170,holidayovertime=180
            };

            TaxRate taxrate1 = new TaxRate()
            {
                Id=1,name="first",amount=300,rate=2
            };
            TaxRate taxrate2 = new TaxRate()
            {
                Id = 2,name = "second",amount = 300,rate = 5
            };

            SSNITRate ssnitrate = new SSNITRate()
            {
                Id=1,name="SSNIT",Rate=3
            };

            StudentSubject subject1 = new StudentSubject()
            {
                Id = 1,
                name = "Maths",
                studentclassid = 1
            };

            StudentSubject subject2 = new StudentSubject()
            {
                Id = 2,
                name = "English",
                studentclassid = 2
            };

           
            EmployeeType employeetype1 = new EmployeeType()
            {
                Id = 1,
                name = "Regular"
            };

            EmployeeType employeetype2 = new EmployeeType()
            {
                Id = 2,
                name = "Staff"
            };


            Student student1 = new Student
            {
                Id = 1,
                gender = "female",
                firstname = "Dede",
                lastname = "Ansah",
                placeofbirth = "Tema",
                dateofbirth = DateTime.Now,
                studentclassId = 2,
                departmentId = 1,
                mothername = "Joyce",
                fathername = "Ankrah",
                regionId = 2,
                city = "Tema",
                address = "P.O.Box 23332",
                email = "samething@gmail.com",
                phone = "2323323",
                studentstatusId = 1,
                scholarshippercent = 0,
                imagesrc = "../../assets/images/default.png"
            };
            Student student2 = new Student
            {
                Id = 2,
                gender = "Male",
                firstname = "Ansah",
                lastname = "Phillip",
                placeofbirth = "Tema",
                dateofbirth = DateTime.Now,
                studentclassId = 1,
                departmentId = 1,
                mothername = "Joyce",
                fathername = "Ankrah",
                regionId = 2,
                city = "Tema",
                address = "P.O.Box 23332",
                email = "samething@gmail.com",
                phone = "2323323",
                studentstatusId = 2,
                scholarshippercent = 0,
                imagesrc = "../../assets/images/default.png"
            };

            Payment payment1 = new Payment
            {

                Id = 1,
                amounttopay = 50,
                amountpaid = 20,
                amountowing = 30,
                studentId = 1

            };

            PaymentHistory paymenthistory1 = new PaymentHistory
            {
                Id = 1,
                amount = 50,
                amountinwords = "Fifty Ghana Cedis",
                paymentdate = DateTime.Now,
                studentId = 1
            };

            Employee employee1 = new Employee()
            {
             Id =1,gender="Male",firstname ="Emmanuel",lastname ="Atiapa",fullname="Emmanuel Atiapa",placeofbirth ="Kpone",dateofbirth =DateTime.Now,categoryId =1,departmentId =1,
            classtoteachId =1,mothername = "Joyce",fathername = "Frank",regionId =1,city ="Tema",address ="P.O.Box 233",email ="sam@gmail.com",phone ="233254443",
            areaofexpertise ="Teaching",levelofeducationId =1,yearsofexperience =2,salary =233,workinghours =22,imagesrc = "../../assets/images/default.png",
            employeetypeId =1
            };

            Employee employee2 = new Employee()
            {
                Id = 2,gender = "Female",firstname = "Kenneth",lastname = "Atsekpor",fullname = "Kenneth Atsekpor",placeofbirth = "Kpone",
                dateofbirth = DateTime.Now,categoryId = 2,departmentId = 2,classtoteachId = 2,mothername = "Joyce",
                fathername = "Frank",regionId = 2,city = "Tema",address = "P.O.Box 233",email = "sam@gmail.com",
                phone = "233254443",areaofexpertise = "Accounting",levelofeducationId = 2,yearsofexperience = 4,
                salary = 233,workinghours = 8,imagesrc = "../../assets/images/default.png",employeetypeId = 2
            };



            PayrollAllowance payrollallowance1 = new PayrollAllowance()
            {
                Id = 1,
                name = "Medical",
                amount = 200
            };

            PayrollAllowance payrollallowance2 = new PayrollAllowance()
            {
                Id = 2,
                name = "Leave",
                amount = 300
            };

            Allowance allowance1 = new Allowance()
            {
                Id = 1,
                payrollamountId = 1,payrollallowanceId=1,
                amount = 30
            };

            Allowance allowance2 = new Allowance()
            {
                Id = 2,
                payrollamountId = 1,
                payrollallowanceId = 2,
                amount = 40
            };


            //PayrollAmount payrollamount1 = new PayrollAmount()
            //{
            //    Id = 1,
            //    employeeId = 1,
            //    enddate = DateTime.Now,
            //    startdate = DateTime.Now,
            //    expectedworkhours = 23,
            //    grosssalary = 500,
            //    netsalary = 450,
            //    holiday = 23,
            //    loan = 34,
            //    payee = 3,
            //    saturday = 3,
            //    ssnit = 3,
            //    totalallowance = 45,
            //    workday = 34,
            //    workdayovertime = 2,
            //    sunday = 43,
            //    saturdayovertime = 3,
            //    sundayovertime = 3,
            //    totalworkdays = 3,
            //    holidayovertime = 4,
            //    allowances = new List<Allowance>()
            //    {
            //        allowance1,allowance2
            //    }
            //};


            EmployeeLoan employeeloan1 = new EmployeeLoan()
            {
                Id = 1,amount=200,amountowing=180,amountpaid=20,interestrate=5,interestamount=20,monthlypayment=200,loandate=DateTime.Now,employeeId = 1
            };

            EmployeeLoanHistory employeeloanhistory1 = new EmployeeLoanHistory()
            {
                Id=1,amount=20,employeeloanId=1,paymentdate=DateTime.Now
            };

            Mark mark1 = new Mark()
            {
                Id = 1,
                examId = 1,
                mark = 10,
                studentsubjectId = 1
            };

            Exam exam1 = new Exam()
            {
                Id = 1,
                studentId = 1,
                marks = new List<Mark>()
                {
                    mark1
                }
            };

            IncomeCategory incomecategory1 = new IncomeCategory()
            {
                Id = 1,
                name = "First Income"
            };

            IncomeCategory incomecategory2 = new IncomeCategory()
            {
                Id = 2,
                name = "Second Income"
            };

            ExpenseCategory expensecategory1 = new ExpenseCategory()
            {
                Id = 1,
                name = "First Expense"
            };

            ExpenseCategory expensecategory2 = new ExpenseCategory()
            {
                Id = 2,
                name = "Second Expense"
            };




            context.appusers.Add(appuser1);
            context.employeetypes.Add(employeetype1);
            context.employeetypes.Add(employeetype2);
            context.studentsubjects.Add(subject1);
            context.studentsubjects.Add(subject2);
            context.departments.Add(department1);
            context.departments.Add(department2);
            context.studentclasses.Add(studentclass1);
            context.studentclasses.Add(studentclass2);
            context.studentstatuses.Add(studentstatus1);
            context.studentstatuses.Add(studentstatus2);
            context.regions.Add(region1);
            context.regions.Add(region2);
            context.employeecategories.Add(employeecategory1);
            context.employeecategories.Add(employeecategory2);
            context.employeelevelsofeducation.Add(employeelevelofeducation1);
            context.employeelevelsofeducation.Add(employeelevelofeducation2);
            context.employees.Add(employee1);
            context.employees.Add(employee2);
            context.students.Add(student1);
            context.students.Add(student2);
            context.payrollallowances.Add(payrollallowance1);
            context.payrollallowances.Add(payrollallowance2);
            //context.payrollamounts.Add(payrollamount1);
            //context.allowances.Add(allowance1);
            //context.allowances.Add(allowance2);
            context.payrollrates.Add(payrollrate);
            context.taxrates.Add(taxrate1);
            context.taxrates.Add(taxrate2);
            context.ssnitrates.Add(ssnitrate);
            context.payments.Add(payment1);
            context.paymenthistories.Add(paymenthistory1);
            context.employeeloans.Add(employeeloan1);
            context.employeeloanhistories.Add(employeeloanhistory1);
            context.exams.Add(exam1);
            context.marks.Add(mark1);
            context.incomecategories.Add(incomecategory1);
            context.incomecategories.Add(incomecategory2);
            context.expensecategories.Add(expensecategory1);
            context.expensecategories.Add(expensecategory2);
            base.Seed(context);
        }
    }
}