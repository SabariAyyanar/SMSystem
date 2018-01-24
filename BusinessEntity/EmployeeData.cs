using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BusinessEntity
{
    public class EmployeeData
    {
        public Employee employee;
        public IEnumerable<EmployeeDocument> employeedocument;
    }
}