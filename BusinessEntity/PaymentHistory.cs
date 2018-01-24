using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BusinessEntity
{
    [Table("PaymentHistory", Schema = "fee")]

    public class PaymentHistory
    {
        public int Id { get; set; }
        public double amount { get; set; }
        public string amountinwords { get; set; }
        public DateTime paymentdate { get; set; }
        public int studentId { get; set; }

        [ForeignKey("studentId")]
        public Student student { get; set; }
        public bool IsTerminated { get; set; }
    }
}