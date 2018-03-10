using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BusinessEntity
{

    [Table("Allowance", Schema = "pay")]
    public class Allowance
    {
        public int Id { get; set; }
        public int payrollallowanceId { get; set; }

        [ForeignKey("payrollallowanceId")]
        public PayrollAllowance payrollallowance { get; set; }

        public int payrollamountId { get; set; }
        [ForeignKey("payrollamountId")]
        public PayrollAmount payrollamount { get; set; }
        public double amount { get; set; }
        public bool IsTerminated { get; set; }
    }
}