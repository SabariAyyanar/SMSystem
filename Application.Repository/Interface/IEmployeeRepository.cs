using BusinessEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Repository.Interface
{
   public interface IEmployeeRepository: IRepository<Employee>
    {

        Employee AddEmployeeAndReturn(Employee entity);
        IEnumerable<Employee> GetAllEmployee();
    }
}
