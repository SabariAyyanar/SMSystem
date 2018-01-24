using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BusinessEntity
{
    [Table("EmployeeLoanHistory",Schema ="emp")]
    public class EmployeeLoanHistory
    {
        public int Id { get; set; }
        public double amount { get; set; }
        public DateTime paymentdate { get; set; }
        public int employeeloanId { get; set; }
        [ForeignKey("employeeloanId")]
        public EmployeeLoan employeeloan { get; set; }
        public bool IsTerminated { get; set; }
    }
}