using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BusinessEntity
{
    [Table("Payment", Schema = "fee")]

    public class Payment
    {
        public int Id { get; set; }
        public double amounttopay { get; set; }
        public double amountpaid { get; set; }
        public double amountowing { get; set; }
        public int studentId { get; set; }

        [ForeignKey("studentId")]
        public Student student { get; set; }
        public bool IsTerminated { get; set; }
    }
}