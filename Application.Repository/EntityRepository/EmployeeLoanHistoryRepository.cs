using Application.Repository.Interface;
using BusinessEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Application.Repository.EntityRepository
{
    public class EmployeeLoanHistoryRepository : Repository<EmployeeLoanHistory>, IEmployeeLoanHistoryRepository
    {
        private ILog _ILog;
        public EmployeeLoanHistoryRepository(PlutoContext context) : base(context)
             {
            _ILog = Log.GetInstance;
        }

        public IEnumerable<EmployeeLoanHistory> GetAllLoanHistoryWithLoanAndEmployee()
        {
            try
            {
                return PlutoContext.employeeloanhistories.Include("employeeloan").Include("employeeloan.employee").ToList();
            }
            catch (Exception ex)
            {
                _ILog.LogException(ex);
                List<EmployeeLoanHistory> emptyobject = new List<EmployeeLoanHistory> { };
                return emptyobject;
            }
        }

        public PlutoContext PlutoContext
        {
            get { return Context as PlutoContext; }
        }

        
    }
}