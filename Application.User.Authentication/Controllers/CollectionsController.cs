using Application.Repository;
using BusinessEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Application.User.Authentication.Controllers
{
    public class CollectionsController : ApiController
    {
        private UnitOfWork unitOfWork;

        public CollectionsController()
        {
            unitOfWork = new UnitOfWork(new PlutoContext());
        }
        //CRUD For Student Classes
                //BEGIN student classes
        [AllowAnonymous]
        [HttpGet]
        public IHttpActionResult GetAllStudentClasses()
        {
            return Ok(unitOfWork.studentclasses.GetAllStudentClasses().Where(p=>p.IsTerminated==false));
        }

        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult AddNewStudentClass(StudentClass newstudentclassadd)
        {
            unitOfWork.studentclasses.Add(newstudentclassadd);
            unitOfWork.Complete();
            return Ok("New Student Class Added Successfully");
        }

        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult UpdateOldStudentClass(StudentClass studentclasstoupdate)
        {
            
            unitOfWork.studentclasses.Update(p => p.Id == studentclasstoupdate.Id, studentclasstoupdate);
            unitOfWork.Complete();
            return Ok("Class Updated Successfully");
        }

        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult RemoveOldStudentClass(StudentClass oldstudentclasstoremove)
        {
            StudentClass getstudentclasstoremove = unitOfWork.studentclasses.Get(oldstudentclasstoremove.Id);
            getstudentclasstoremove.IsTerminated = true;
            unitOfWork.studentclasses.Update(p => p.Id == getstudentclasstoremove.Id, getstudentclasstoremove);
            unitOfWork.Complete();
            return Ok("Class Removed Successfully");
        }

                //END student classes

        //CRUD Operations for departments
        //BEGIN departments
        [AllowAnonymous]
        [HttpGet]
        public IHttpActionResult GetAllDepartments()
        {
            return Ok(unitOfWork.departments.GetAll().Where(p => p.IsTerminated == false));
        }

        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult AddNewDepartment(Department newsdepartmenttoadd)
        {
           
            unitOfWork.departments.Add(newsdepartmenttoadd);
            unitOfWork.Complete();
            return Ok("New Department Added Successfully");
        }

        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult UpdateOldDepartment(Department departmenttoupdate)
        {

            unitOfWork.departments.Update(p => p.Id == departmenttoupdate.Id, departmenttoupdate);
            unitOfWork.Complete();
            return Ok("Department Updated Successfully");
        }

        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult RemoveOldDepartment(Department olddepartmenttoremove)
        {
            olddepartmenttoremove.IsTerminated = true;
            unitOfWork.departments.Update(p => p.Id == olddepartmenttoremove.Id, olddepartmenttoremove);
            unitOfWork.Complete();
            return Ok("Department Removed Successfully");
        }

             //END departments

        //CRUD For Regions
        //BEGIN Regions

        [AllowAnonymous]
        [HttpGet]
        public IHttpActionResult GetAllRegions()
        {
            return Ok(unitOfWork.regions.GetAll().Where(p => p.IsTerminated == false));
        }

        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult AddNewRegion(Region newregiontoadd)
        {

            unitOfWork.regions.Add(newregiontoadd);
            unitOfWork.Complete();
            return Ok("New Region Added Successfully");
        }

        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult UpdateOldRegion(Region regiontoupdate)
        {

            unitOfWork.regions.Update(p => p.Id == regiontoupdate.Id, regiontoupdate);
            unitOfWork.Complete();
            return Ok("Region Updated Successfully");
        }

        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult RemoveOldRegion(Region oldregiontoremove)
        {
            oldregiontoremove.IsTerminated = true;
            unitOfWork.regions.Update(p => p.Id == oldregiontoremove.Id, oldregiontoremove);
            unitOfWork.Complete();
            return Ok("Region Removed Successfully");
        }

        //END Regions


        //CRUD For studentstatuses

        //BEGIN Student statuses

        [AllowAnonymous]
        [HttpGet]
        public IHttpActionResult GetAllStudentStatuses()
        {
            return Ok(unitOfWork.studentstatuses.GetAll().Where(p => p.IsTerminated == false));
        }

        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult AddNewStudentStatus(StudentStatus newstudentstatustoadd)
        {

            unitOfWork.studentstatuses.Add(newstudentstatustoadd);
            unitOfWork.Complete();
            return Ok("New Status Added Successfully");
        }

        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult UpdateOldStudentStatus(StudentStatus studentstatustoupdate)
        {

            unitOfWork.studentstatuses.Update(p => p.Id == studentstatustoupdate.Id, studentstatustoupdate);
            unitOfWork.Complete();
            return Ok("Status Updated Successfully");
        }

        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult RemoveOldStudentStatus(StudentStatus oldstudentstatustoremove)
        {
            oldstudentstatustoremove.IsTerminated = true;
            unitOfWork.studentstatuses.Update(p => p.Id == oldstudentstatustoremove.Id, oldstudentstatustoremove);
            unitOfWork.Complete();
            return Ok("Status Removed Successfully");
        }

        //END Student statuses

        //CRUD For Student Subjects
        //BEGIN Student subjects
        [AllowAnonymous]
        [HttpGet]
        public IHttpActionResult GetAllStudentSubjects()
        {

            return Ok(unitOfWork.studentsubjects.GetAll().Where(p => p.IsTerminated == false));
        }

        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult AddNewStudentSubject(StudentSubject newstudentclassadd)
        {
            unitOfWork.studentsubjects.Add(newstudentclassadd);
            unitOfWork.Complete();
            return Ok("New Subject Added Successfully");
        }


        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult UpdateOldStudentSubject(StudentSubject studentsubjecttoupdate)
        {

            unitOfWork.studentsubjects.Update(p => p.Id == studentsubjecttoupdate.Id, studentsubjecttoupdate);
            unitOfWork.Complete();
            return Ok("Subject Updated Successfully");
        }

        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult RemoveOldStudentSubject(StudentSubject oldstudentsubjecttoremove)
        {
            StudentSubject getstudentsubjecttoremove = unitOfWork.studentsubjects.Get(oldstudentsubjecttoremove.Id);
            getstudentsubjecttoremove.IsTerminated = true;
            unitOfWork.studentsubjects.Update(p => p.Id == getstudentsubjecttoremove.Id, oldstudentsubjecttoremove);
            unitOfWork.Complete();
            return Ok("Subject Removed Successfully");
        }

        //END Student subjects

        //CRUD For Employee Categories
        //BEGIN employee categories
        [AllowAnonymous]
        [HttpGet]
        public IHttpActionResult GetAllEmployeeCategories()
        {
            return Ok(unitOfWork.employeecategories.GetAll().Where(p => p.IsTerminated == false));
        }

        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult AddNewEmployeeCategories(EmployeeCategory newemployeecategoryadd)
        {
            unitOfWork.employeecategories.Add(newemployeecategoryadd);
            unitOfWork.Complete();
            return Ok("New Employee Category Added Successfully");
        }
        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult UpdateOldEmployeeCategory(EmployeeCategory employeecategorytoupdate)
        {

            unitOfWork.employeecategories.Update(p => p.Id == employeecategorytoupdate.Id, employeecategorytoupdate);
            unitOfWork.Complete();
            return Ok("Employee Category Updated Successfully");
        }

        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult RemoveOldEmployeeCategory(EmployeeCategory oldemployeecategorytoremove)
        {
            EmployeeCategory getemployeecategorytoremove = unitOfWork.employeecategories.Get(oldemployeecategorytoremove.Id);
            getemployeecategorytoremove.IsTerminated = true;
            unitOfWork.employeecategories.Update(p => p.Id == getemployeecategorytoremove.Id, getemployeecategorytoremove);
            unitOfWork.Complete();
            return Ok("Employee Category Removed Successfully");
        }


        //END employee categories

        //CRUD For Employee Level of Education
        //BEGIN Employee level of education
        [AllowAnonymous]
        [HttpGet]
        public IHttpActionResult GetAllEmployeeLevelsOfEducation()
        {
            return Ok(unitOfWork.employeelevelsofeducation.GetAll().Where(p => p.IsTerminated == false));
        }

        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult AddNewEmployeeLevelsOfEducation(EmployeeLevelOfEducation newemployeelevelsofeducationtoadd)
        {
            unitOfWork.employeelevelsofeducation.Add(newemployeelevelsofeducationtoadd);
            unitOfWork.Complete();
            return Ok("New Employee Level Of Education Added Successfully");
        }
        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult UpdateOldEmployeeLevelsOfEducation(EmployeeLevelOfEducation employeelevelsofeducationtoupdate)
        {

            unitOfWork.employeelevelsofeducation.Update(p => p.Id == employeelevelsofeducationtoupdate.Id, employeelevelsofeducationtoupdate);
            unitOfWork.Complete();
            return Ok("Employee Level OF Education Updated Successfully");
        }

        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult RemoveOldEmployeeLevelsOfEducation(EmployeeLevelOfEducation oldemployeelevelsofeducationtoremove)
        {
            EmployeeLevelOfEducation getemployeelevelsofeducationtoremove = unitOfWork.employeelevelsofeducation.Get(oldemployeelevelsofeducationtoremove.Id);
            getemployeelevelsofeducationtoremove.IsTerminated = true;
            unitOfWork.employeelevelsofeducation.Update(p => p.Id == getemployeelevelsofeducationtoremove.Id, getemployeelevelsofeducationtoremove);
            unitOfWork.Complete();
            return Ok("Employee Level OF Education Removed Successfully");
        }


        //  END Employee level of education

        //CRUD For Payroll Rates
        //BEGIN Payroll rates
        [AllowAnonymous]
        [HttpGet]
        public IHttpActionResult GetAllPayrollRates()
        {
            return Ok(unitOfWork.payrollrates.GetAll().Where(p => p.IsTerminated == false).FirstOrDefault());
        }

        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult AddNewPayrollRates(PayrollRate newpayrollratestoadd)
        {
            unitOfWork.payrollrates.Add(newpayrollratestoadd);
            unitOfWork.Complete();
            return Ok("New Payroll Rates Added Successfully");
        }
        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult SaveOldPayrollRates(PayrollRate payrollratestoupdate)
        {
            PayrollRate getpayrollrates = unitOfWork.payrollrates.Get(payrollratestoupdate.Id);
            if (getpayrollrates != null)
            {
                unitOfWork.payrollrates.Update(p => p.Id == getpayrollrates.Id, payrollratestoupdate);
            }
            else
            {
                unitOfWork.payrollrates.Add(payrollratestoupdate);
                unitOfWork.Complete();
            }
            unitOfWork.Complete();
            return Ok("Payroll Rates Saved");
        }

        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult RemoveOldPayrollRates(PayrollRate oldpayrollratestoremove)
        {
            PayrollRate getpayrollratestoremove = unitOfWork.payrollrates.Get(oldpayrollratestoremove.Id);
            getpayrollratestoremove.IsTerminated = true;
            unitOfWork.payrollrates.Update(p => p.Id == getpayrollratestoremove.Id, oldpayrollratestoremove);
            unitOfWork.Complete();
            return Ok("Payroll Rates Removed Successfully");

        }
                //END Payroll Rates

            //CRUD For Tax Rates
            //BEGIN Tax rates

        [AllowAnonymous]
        [HttpGet]
        public IHttpActionResult GetAllTaxRates()
        {
            return Ok(unitOfWork.taxrates.GetAll().Where(p => p.IsTerminated == false));
        }

        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult AddNewTaxRates(TaxRate newtaxratestoadd)
        {
            unitOfWork.taxrates.Add(newtaxratestoadd);
            unitOfWork.Complete();
            return Ok("New Tax Rate Successfully");
        }
        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult UpdateOldTaxRates(TaxRate taxratestoupdate)
        {

            unitOfWork.taxrates.Update(p => p.Id == taxratestoupdate.Id, taxratestoupdate);
            unitOfWork.Complete();
            return Ok("Tax Rate Updated Successfully");
        }

        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult RemoveOldTaxRates(TaxRate oldtaxratestoremove)
        {
            TaxRate gettaxratestoremove = unitOfWork.taxrates.Get(oldtaxratestoremove.Id);
            gettaxratestoremove.IsTerminated = true;
            unitOfWork.taxrates.Update(p => p.Id == gettaxratestoremove.Id, oldtaxratestoremove);
            unitOfWork.Complete();
            return Ok("Tax Rate Removed Successfully");

        }

        //END Tax Rates

        //CRUD For SSNIT Rates
        //BEGIN SSNIT Rates
        [AllowAnonymous]
        [HttpGet]
        public IHttpActionResult GetAllSSNITRates()
        {
            return Ok(unitOfWork.ssnitrates.GetAll().Where(p => p.IsTerminated == false).FirstOrDefault());
        }

        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult AddNewSSNITRates(SSNITRate newssnitratesatodd)
        {
            unitOfWork.ssnitrates.Add(newssnitratesatodd);
            unitOfWork.Complete();
            return Ok("New SSNIT Rate Added Successfully");
        }
        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult SaveSSNITRate(SSNITRate ssnitratestoupdate)
        {
            SSNITRate getssnitratestoupdate = unitOfWork.ssnitrates.Get(ssnitratestoupdate.Id);
            if (getssnitratestoupdate != null)
            {
                unitOfWork.ssnitrates.Update(p => p.Id == ssnitratestoupdate.Id, ssnitratestoupdate);
            }
            else
            {
                unitOfWork.ssnitrates.Add(ssnitratestoupdate);
                unitOfWork.Complete();
            }
            unitOfWork.Complete();
            return Ok("SSNIT Rate Saved");
        }

        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult RemoveOldssnitrates(SSNITRate oldssnitratestoremove)
        {
            SSNITRate getssnitratestoremove = unitOfWork.ssnitrates.Get(oldssnitratestoremove.Id);
            getssnitratestoremove.IsTerminated = true;
            unitOfWork.ssnitrates.Update(p => p.Id == getssnitratestoremove.Id, oldssnitratestoremove);
            unitOfWork.Complete();
            return Ok("SSNIT Rate Removed Successfully");

        }
        //END SSNIT Rates


        //CRUD For Payroll Allowances
        //BEGIN Payroll Allowances
        [AllowAnonymous]
        [HttpGet]
        public IHttpActionResult GetAllPayrollAllowances()
        {
            return Ok(unitOfWork.payrollallowances.GetAll().Where(p => p.IsTerminated == false));
        }

        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult AddNewPayrollAllowances(PayrollAllowance newpayrollallowancestodd)
        {
            unitOfWork.payrollallowances.Add(newpayrollallowancestodd);
            unitOfWork.Complete();
            return Ok("New Payroll Allowance Added Successfully");
        }
        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult UpdateOldPayrollAllowances(PayrollAllowance payrollallowancesoupdate)
        {

            unitOfWork.payrollallowances.Update(p => p.Id == payrollallowancesoupdate.Id, payrollallowancesoupdate);
            unitOfWork.Complete();
            return Ok("Payroll Allowance Updated Successfully");
        }

        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult RemoveOldPayrollAllowances(PayrollAllowance oldpayrollallowancestoremove)
        {
            PayrollAllowance getpayrollallowancestoremove = unitOfWork.payrollallowances.Get(oldpayrollallowancestoremove.Id);
            getpayrollallowancestoremove.IsTerminated = true;
            unitOfWork.payrollallowances.Update(p => p.Id == getpayrollallowancestoremove.Id, getpayrollallowancestoremove);
            unitOfWork.Complete();
            return Ok("Payroll Allowance Removed Successfully");

        }
        //END Payroll Allowances

        [AllowAnonymous]
        [HttpGet]
        public IHttpActionResult GeAllEmployeeTypes()
        {
            return Ok(unitOfWork.employeetypes.GetAll().Where(p => p.IsTerminated == false));
        }
        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult SaveEmployeeType(EmployeeType employeetypetosave)
        {
            EmployeeType getemployeetosave = unitOfWork.employeetypes.Get(employeetypetosave.Id);
            if (getemployeetosave != null)
            {
                unitOfWork.employeetypes.Update(p => p.Id == getemployeetosave.Id, employeetypetosave);
                unitOfWork.Complete();
                return Ok("Employee Type Rename");
            }
            else
            {
                return Ok("Contact The Software Developer to Add Employee Type");
            }
        }
        //END Payroll Allowances
    }
}
