using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BusinessEntity
{
    [Table("EmployeeCategory", Schema = "emp")]
    public class EmployeeCategory
    {
        public int Id { get; set; }
        public string name { get; set; }
        public double allowancepercentage { get; set; }
        public bool IsTerminated { get; set; }
    }
}