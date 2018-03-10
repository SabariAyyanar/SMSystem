using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BusinessEntity
{
    [Table("PayrollDate", Schema = "pay")]
    public class PayrollDate
    {
       
        public int Id { get; set; }
        public DateTime startdate { get; set; }
        public DateTime enddate { get; set; }
        public int numberofdays { get; set; }

        public bool IsTerminated { get; set; }
    }
}