using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BusinessEntity
{
    [Table("TaxRate", Schema = "pay")]

    public class TaxRate
    {
        public int Id { get; set; }
        public string name { get; set; }
        public double amount { get; set; }
        public double rate { get; set; }
        public bool IsTerminated { get; set; }
    }
}