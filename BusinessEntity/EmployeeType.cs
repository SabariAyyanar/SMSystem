using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BusinessEntity
{
    [Table("EmployeeType", Schema = "emp")]
    public class EmployeeType
    {
        public int Id { get; set; }
        public string name { get; set; }
        public bool IsTerminated { get; set; }
    }
}