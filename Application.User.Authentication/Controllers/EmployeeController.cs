using Application.Repository;
using BusinessEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Application.User.Authentication.Controllers
{
    public class EmployeeController : ApiController
    {
        private UnitOfWork unitOfWork;

        public EmployeeController()
        {
            unitOfWork = new UnitOfWork(new PlutoContext());
        }
            
        //crud for employee
                //begin employee
        [AllowAnonymous]
        [HttpGet]
        public IHttpActionResult GetAllEmployee()
        {
            return Ok(unitOfWork.employees.GetAll().Where(p => p.IsTerminated == false));
        }

        

        [AllowAnonymous]
        [HttpGet]
        public IHttpActionResult GetEmployeeDocuments(int employeeId)
        {
            return Ok(unitOfWork.employeedocuments.GetAll().Where(p=>p.employeeId == employeeId).Where(p => p.IsTerminated == false));
        }


        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult AddNewEmployee(EmployeeData newemployeedata)
        {
            newemployeedata.employee.fullname = newemployeedata.employee.firstname + " " + newemployeedata.employee.lastname;
            Employee employee = unitOfWork.employees.AddEmployeeAndReturn(newemployeedata.employee);
            unitOfWork.Complete();
            if (newemployeedata.employeedocument != null)
            {
                foreach (EmployeeDocument employeedocument in newemployeedata.employeedocument)
                {
                    employeedocument.employeeId = employee.Id;
                }
                unitOfWork.employeedocuments.AddRange(newemployeedata.employeedocument);
            }
            unitOfWork.Complete();
            return Ok("One new Employee Successfully Added");
        }
        

        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult UpdateOldEmployee(EmployeeData oldemployeedata)
        {
            int employeeId = oldemployeedata.employee.Id;
            Expression<Func<Employee, bool>> myfuncforemployee = s => s.Id == oldemployeedata.employee.Id;
            IEnumerable<EmployeeDocument> employeedocumentslist =  unitOfWork.employeedocuments.Find(p => p.employeeId == oldemployeedata.employee.Id);
            unitOfWork.employeedocuments.RemoveRange(employeedocumentslist);
            unitOfWork.employees.Update(myfuncforemployee, oldemployeedata.employee);
            unitOfWork.Complete();
            foreach (EmployeeDocument doc in oldemployeedata.employeedocument)
            {
                    doc.employeeId = employeeId;
                    unitOfWork.employeedocuments.Add(doc);
            }
            unitOfWork.Complete();
            return Ok("Employee Updated Successfully");
        }

        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult RemoveOldEmployee(Employee oldemployeetoremove)
        {
            Employee getemployeetoremove = new Employee() { Id = oldemployeetoremove.Id };
            IEnumerable<EmployeeDocument> getemployeedocumentstoremove = unitOfWork.employeedocuments.Find(p => p.employeeId == oldemployeetoremove.Id);

            getemployeetoremove.IsTerminated = true;
            unitOfWork.employees.Update(p => p.Id == getemployeetoremove.Id, getemployeetoremove);

            foreach (EmployeeDocument doc in getemployeedocumentstoremove)
            {
                doc.IsTerminated = true;
                unitOfWork.employeedocuments.Update(p => p.Id == doc.Id, doc);
            }

            unitOfWork.Complete();
            return Ok("Employee removed Successfully");
        }
        //end employee

        // Crud for employee Payroll
        [AllowAnonymous]
        [HttpGet]
        public IHttpActionResult GetAllEmployeeForPayroll()
        {
            return Ok(unitOfWork.employees.GetAllEmployee().Where(p => p.IsTerminated == false && p.iscurrentpayrollamount == false));
        }

        [AllowAnonymous]
        [HttpGet]
        public IHttpActionResult GetAllEmployeeForPayrollPrint()
        {
            return Ok(unitOfWork.employees.GetAllEmployee().Where(p => p.IsTerminated == false && p.iscurrentpayrollamount == true));
        }



        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult AddEmployeeForPayroll(Employee employeetoremovefrompayroll)
        {
            Employee getemployeetoremovefrompayroll = unitOfWork.employees.Get(employeetoremovefrompayroll.Id);
            getemployeetoremovefrompayroll.iscurrentpayrollamount = false;
            unitOfWork.employees.Update(p => p.Id == getemployeetoremovefrompayroll.Id, getemployeetoremovefrompayroll);
            unitOfWork.Complete();
            return Ok("Employee Current Payroll Details Removed");
        }


        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult AddEmployeeForPayrollPrint(Employee employeetoremovefrompayroll)
        {
            Employee getemployeetoremovefrompayroll = unitOfWork.employees.Get(employeetoremovefrompayroll.Id);
            getemployeetoremovefrompayroll.iscurrentpayrollamount = true;
            unitOfWork.employees.Update(p => p.Id == getemployeetoremovefrompayroll.Id, getemployeetoremovefrompayroll);
            unitOfWork.Complete();
            return Ok("Employee Removed From Current Payroll");
        }


        //end crud for employee payroll

        //CRUD For Employee loan
        //BEGIN of employee laon

        [AllowAnonymous]
        [HttpGet]
        public IHttpActionResult GetEmployeeLoan(int employeeloanId)
        {
            return Ok(unitOfWork.employeeloans.GetAll().Where(p => p.Id == employeeloanId).Where(p => p.IsTerminated == false));
        }

        [AllowAnonymous]
        [HttpGet]
        public IHttpActionResult GetAllEmployeeloan()
        {
            return Ok(unitOfWork.employeeloans.GetAll().Where(p => p.IsTerminated == false));
        }

        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult AddNewEmployeeLoan(EmployeeLoan newemployeeloan)
        {
            newemployeeloan.employee = unitOfWork.employees.Get(newemployeeloan.Id);
            unitOfWork.employeeloans.Add(newemployeeloan);
            unitOfWork.Complete();
            return Ok("One new Employee Loan Successfully Added");
        }


        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult UpdateOldEmployeeLoan(EmployeeLoan oldemployeeloan)
        {
            Expression<Func<EmployeeLoan, bool>> myfuncforemployeeloan = s => s.Id == oldemployeeloan.Id;
            unitOfWork.employeeloans.Update(myfuncforemployeeloan, oldemployeeloan);
            unitOfWork.Complete();
            return Ok("Employee Loan Updated Successfully");
        }

        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult RemoveOldEmployeeLoan(EmployeeLoan oldemployeeloantoremove)
        {
            EmployeeLoan getemployeeloantoremove = unitOfWork.employeeloans.Get(oldemployeeloantoremove.Id);
            getemployeeloantoremove.IsTerminated = true;
            unitOfWork.employeeloans.Update(p => p.Id == getemployeeloantoremove.Id, getemployeeloantoremove);
            unitOfWork.Complete();
            return Ok("Employee Loan removed Successfully");
        }

        //END of employee loan

        //CRUD for employee loan history
        //BEGIN employee loan history
        [AllowAnonymous]
        [HttpGet]
        public IHttpActionResult GetEmployeeLoanHistory(int employeeloanhistoryId)
        {
            return Ok(unitOfWork.employeeloanhistories.GetAll().Where(p => p.Id == employeeloanhistoryId).Where(p => p.IsTerminated == false));
        }

        [AllowAnonymous]
        [HttpGet]
        public IHttpActionResult GetAllEmployeeloanHistory()
        {
            return Ok(unitOfWork.employeeloanhistories.GetAllLoanHistoryWithLoanAndEmployee().Where(p => p.IsTerminated == false));
        }

        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult AddNewEmployeeLoanHistory(EmployeeLoanHistory newemployeeloanhistory)
        {
            unitOfWork.employeeloanhistories.Add(newemployeeloanhistory);
            unitOfWork.Complete();
            return Ok("One new Employee Loan History Successfully Added");
        }


        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult UpdateOldEmployeeLoanHistory(EmployeeLoanHistory oldemployeeloanhistory)
        {
            Expression<Func<EmployeeLoanHistory, bool>> myfuncforemployeeloanhistory = s => s.Id == oldemployeeloanhistory.Id;
            unitOfWork.employeeloanhistories.Update(myfuncforemployeeloanhistory, oldemployeeloanhistory);
            unitOfWork.Complete();
            return Ok("Employee Loan History Updated Successfully");
        }

        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult RemoveOldEmployeeLoanHistory(EmployeeLoanHistory oldemployeeloanhistorytoremove)
        {
            EmployeeLoanHistory getemployeeloanhistorytoremove = unitOfWork.employeeloanhistories.Get(oldemployeeloanhistorytoremove.Id);
            getemployeeloanhistorytoremove.IsTerminated = true;
            unitOfWork.employeeloanhistories.Update(p => p.Id == getemployeeloanhistorytoremove.Id, getemployeeloanhistorytoremove);
            unitOfWork.Complete();
            return Ok("Employee Loan History removed Successfully");
        }


        //END employee loan history



        //BEGIN Employee Payroll
        [AllowAnonymous]
        [HttpGet]
        public IHttpActionResult GetAllPayrollAmount()
        {
            return Ok(unitOfWork.employeeloanhistories.GetAllLoanHistoryWithLoanAndEmployee().Where(p => p.IsTerminated == false));
        }

        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult AddNewPayrollAmount(PayrollAmount newpayrollamount)
        {
            
            newpayrollamount.employee = null;
            unitOfWork.payrollamounts.Add(newpayrollamount);
            unitOfWork.Complete();
            return Ok("One new Payroll Amount Added History Successfully Added");
        }


        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult UpdateOldPayrollAmount(PayrollAmount oldpayrollamount)
        {
            unitOfWork.payrollamounts.Update(p => p.Id == oldpayrollamount.Id, oldpayrollamount);
            unitOfWork.Complete();
            return Ok("Payroll Updated Successfully");
        }

        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult RemoveOldPayrollAmount(PayrollAmount oldpayrollamounttoremove)
        {
            PayrollAmount getpayrollamounttoremove = unitOfWork.payrollamounts.Get(oldpayrollamounttoremove.Id);
            getpayrollamounttoremove.IsTerminated = true;
            unitOfWork.payrollamounts.Update(p => p.Id == getpayrollamounttoremove.Id, getpayrollamounttoremove);
            unitOfWork.Complete();
            return Ok("Payroll removed Successfully");
        }


        //END Employee Payroll


        //BEGIN Payroll Date
        [AllowAnonymous]
        [HttpGet]
        public IHttpActionResult GetAllPayrollDate()
        {
            return Ok(unitOfWork.payrolldates.GetAll().Where(p => p.IsTerminated == false));
        }

        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult AddNewPayrollDate(PayrollDate newpayrolldate)
        {
            unitOfWork.payrolldates.Add(newpayrolldate);
            List<Employee> empployeelist = unitOfWork.employees.GetAll().Where(p => p.IsTerminated == false).ToList();
            foreach(Employee employee  in empployeelist)
            {
                employee.iscurrentpayrollamount = false;
                unitOfWork.employees.Update(p => p.Id == employee.Id, employee);
            }
            unitOfWork.Complete();
            return Ok("One new Payroll Date Added Successfully Added");
        }


        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult UpdateOldPayrollDate(PayrollDate oldpayrolldate)
        {
            unitOfWork.payrolldates.Update(p => p.Id == oldpayrolldate.Id, oldpayrolldate);
            unitOfWork.Complete();
            return Ok("Payroll Date Updated Successfully");
        }

        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult RemoveOldPayrollDate(PayrollDate oldpayrolldatetoremove)
        {
            PayrollDate getpayrolldatetoremove = unitOfWork.payrolldates.Get(oldpayrolldatetoremove.Id);
            getpayrolldatetoremove.IsTerminated = true;
            unitOfWork.payrolldates.Update(p => p.Id == getpayrolldatetoremove.Id, getpayrolldatetoremove);
            unitOfWork.Complete();
            return Ok("Payroll Date removed Successfully");
        }


        //END Employee Payroll


    }
}
