using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BusinessEntity
{
    [Table("ExpenseCategory", Schema = "msc")]
    public class ExpenseCategory
    {
        public int Id { get; set; }
        public string name { get; set; }
        public bool IsTerminated { get; set; }
    }
}