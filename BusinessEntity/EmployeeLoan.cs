using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BusinessEntity
{
    [Table("EmployeeLoan", Schema = "emp")]
    public class EmployeeLoan
    {
        public int Id { get; set; }
        public double amount { get; set; }
        public double amountowing { get; set; }
        public double amountpaid { get; set; }
        public double interestrate { get; set; }
        public double interestamount { get; set; }
        public double monthlypayment { get; set; }
        public DateTime loandate { get; set; } 
        public int employeeId { get; set; }
        [ForeignKey("employeeId")]
        public Employee employee { get; set; }
        public bool IsTerminated { get; set; }
    }
}