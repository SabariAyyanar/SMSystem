using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BusinessEntity
{
    [Table("EmployeeDocument", Schema = "emp")]

    public class EmployeeDocument
    {
        public int Id {get;set;}
        public string documentsrc { get; set; }
        public string details { get; set; }
        public int employeeId { get; set; }
        [ForeignKey("employeeId")]
        public Employee employee { get; set; }
        public bool IsTerminated { get; set; }
    }
}