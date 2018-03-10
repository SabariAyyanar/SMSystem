using BusinessEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Repository.Interface
{
    public interface IEmployeeLoanHistoryRepository : IRepository<EmployeeLoanHistory>
    {
        IEnumerable<EmployeeLoanHistory> GetAllLoanHistoryWithLoanAndEmployee();
    }
}
