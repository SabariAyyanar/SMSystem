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
    public class StudentController : ApiController
    {
        private UnitOfWork unitOfWork;

        public StudentController()
        {
            unitOfWork = new UnitOfWork(new PlutoContext());
        }


        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult PrintExam()
        {
            unitOfWork.externalhelper.Print(new Exam());
            unitOfWork.Complete();
            return Ok("Printing done");
        }


        [AllowAnonymous]
        [HttpGet]
        public IHttpActionResult GetAllStudent()
        {
            return Ok(unitOfWork.Students.GetAllStudents().Where(p => p.IsTerminated == false));
        }
                
        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult AddStudent(Student newstudent)

        {
            unitOfWork.Students.Add(newstudent);
            unitOfWork.Complete();
            return Ok("One new Student Successfully Added");
        }

        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult UpdateStudent(Student studenttoupdate)
        {
            Expression<Func<Student, bool>> myfunc = s => s.Id == studenttoupdate.Id;
            unitOfWork.Students.Update(myfunc, studenttoupdate);
            unitOfWork.Complete();
            return Ok("Student Updated Successfully");
        }

        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult RemoveStudent(Student studenttoremove)
        {
            Student getstudenttoremove = unitOfWork.Students.Get(studenttoremove.Id);
            getstudenttoremove.IsTerminated = true;
            unitOfWork.Students.Update(p => p.Id == getstudenttoremove.Id, getstudenttoremove);
            unitOfWork.Complete();
            return Ok("Student removed Successfully");
        }

        //CRUD For Exams
        //begin crud for exams

        [AllowAnonymous]
        [HttpGet]
        public IHttpActionResult GetAllExam()
        {
            
            return Ok(unitOfWork.exams.GetAllExams().Where(p => p.IsTerminated == false));
        }
        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult AddExam(Exam newexamtoadd)
        {
           if(unitOfWork.exams.Find(p => p.studentId == newexamtoadd.studentId).Count() > 0 ){
                return Ok("Exam already added for student");
            };
            foreach(Mark mark in newexamtoadd.marks)
            {
                mark.studentsubject = unitOfWork.studentsubjects.Get(mark.studentsubjectId);
                unitOfWork.exams.Add(newexamtoadd);
            }
            unitOfWork.Complete();
            return Ok("One new Exam Score Successfully Added");
        }

        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult UpdateExam(Exam examtoupdate)
        {
            foreach (Mark mark in examtoupdate.marks)
            {
                unitOfWork.marks.Update(m=>m.Id == mark.Id,mark);
            }
            unitOfWork.Complete();
            return Ok("Exam Updated Successfully");
        }

        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult RemoveExam(Exam examtoremove)
        {
            Exam getexamtoremove = unitOfWork.exams.Get(examtoremove.Id);
            getexamtoremove.IsTerminated = true;
            unitOfWork.exams.Update(p => p.Id == getexamtoremove.Id, getexamtoremove);
            unitOfWork.Complete();
            return Ok("Exam removed Successfully");
        }

        // end crud for exams

    }
}
