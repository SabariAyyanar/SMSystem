using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BusinessEntity
{
    [Table("PayrollAllowance", Schema = "pay")]
    public class PayrollAllowance
    {
        public int Id { get; set; }
        public string name { get; set; }
        public double amount { get; set; }
        public bool IsTerminated { get; set; }
    }
}