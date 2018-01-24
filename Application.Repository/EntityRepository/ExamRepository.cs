using Application.Repository.Interface;
using BusinessEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Application.Repository.EntityRepository
{
    public class ExamRepository : Repository<Exam>, IExamRepository
    {
        private ILog _ILog;
        public ExamRepository(PlutoContext context) : base(context)
             {
            _ILog = Log.GetInstance;
        }

        public PlutoContext PlutoContext
        {
            get { return Context as PlutoContext; }
        }

        public IEnumerable<Exam> GetAllExams()
        {
            try
            {

                return PlutoContext.exams.Include("student").Include("marks").Include("student.studentclass").Include("student.department").ToList(); ;
            }
            catch (Exception ex)
            {
                _ILog.LogException(ex);
                return new List<Exam>();
            }
            
        }
    }
}