using Application.Repository.Interface;
using BusinessEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Application.Repository.EntityRepository
{
    public class StudentRepository : Repository<Student> ,IStudentRepository
    {
        private ILog _ILog ;
        public StudentRepository(PlutoContext context) : base(context)
             {
            _ILog = Log.GetInstance;
        }

        public IEnumerable<Student> GetAllStudents()
        {
            try
            {

                var data = PlutoContext.students.Include("studentclass").Include("department").ToList();
                return PlutoContext.students.Include("studentclass").ToList();
            }
            catch (Exception ex)
            {
                _ILog.LogException(ex);
                return new List<Student>();
            }
        }

        public PlutoContext PlutoContext
        {
            get { return Context as PlutoContext; }
        }

      
    }
}