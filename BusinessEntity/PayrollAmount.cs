using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BusinessEntity
{
    [Table("PayrollAmount", Schema = "pay")]

    public class PayrollAmount
    {
        public int Id { get; set; }
        public int employeeId { get; set; }
        [ForeignKey("employeeId")]
        public Employee employee { get; set; }
        public int workday { get; set; }
        public  int workdayovertime { get; set; }
        public int saturday { get; set; }
        public int saturdayovertime { get; set; }
        public int sunday { get; set; }
        public int sundayovertime { get; set; }
        public int holiday { get; set; }
        public int holidayovertime { get; set; }
        public int payee { get; set; }
        public int ssnit { get; set; }
        public int loan { get; set; }
        public ICollection<Allowance> allowances { get; set; }
        public int totalallowance { get; set; }
        public int grosssalary { get; set; }
        public int netsalary { get; set; }
        public int totalworkdays { get; set; }
        public int expectedworkhours { get; set; }
        public DateTime startdate { get; set; }
        public DateTime enddate { get; set; }
        public bool IsTerminated { get; set; }
    }
}