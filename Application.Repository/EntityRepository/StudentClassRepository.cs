using Application.Repository.Interface;
using BusinessEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Application.Repository.EntityRepository
{
    public class StudentClassRepository : Repository<StudentClass>,IStudentClassRepository
    {
        private ILog _ILog;
        public StudentClassRepository(PlutoContext context) : base(context)
             {
            _ILog = Log.GetInstance;
        }

        public PlutoContext PlutoContext
        {
            get { return Context as PlutoContext; }
        }

        public IEnumerable<StudentClass> GetAllStudentClasses()
        {
            try {
                return PlutoContext.studentclasses.Include("classsubjects").ToList();
            }
            catch(Exception ex)
            {
                _ILog.LogException(ex);
                return new List<StudentClass>();
            }
        }
    }
}