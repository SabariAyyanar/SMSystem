using Application.Repository.Interface;
using BusinessEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Application.Repository.EntityRepository
{
    public class EmployeeRepository : Repository<Employee>, IEmployeeRepository
    {
        private ILog _ILog;
        public EmployeeRepository(PlutoContext context) : base(context)
             {
            _ILog = Log.GetInstance;
        }


        public PlutoContext PlutoContext
        {
            get { return Context as PlutoContext; }
        }

        public Employee AddEmployeeAndReturn(Employee entity)
        {
            try
            {
                return Context.Set<Employee>().Add(entity);
            }
            catch (Exception ex)
            {
                _ILog.LogException(ex);
                return new Employee();
            }
        }

        public IEnumerable<Employee> GetAllEmployee()
        {
            try
            {
                var data = PlutoContext.employees.Include("category").Include("department").ToList();
                return PlutoContext.employees.Include("category").Include("department").ToList();
            }
            catch (Exception ex)
            {
                _ILog.LogException(ex);
                return new List<Employee>();
            }
        }
    }
}