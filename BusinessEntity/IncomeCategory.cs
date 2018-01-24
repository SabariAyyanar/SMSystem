using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BusinessEntity
{
    [Table("IncomeCategory", Schema = "msc")]
    public class IncomeCategory
    {
        public int Id { get; set; }

        public string name { get; set; }
        public bool IsTerminated { get; set; }
    }
}