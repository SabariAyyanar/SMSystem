using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BusinessEntity
{
    [Table("Expense", Schema = "msc")]
    public class Expense
    {
        public int Id { get; set; }


        public int expensecategoryId { get; set; }
        [ForeignKey("expensecategoryId")]
        public ExpenseCategory expensecategory { get; set; }
        public string description { get; set; }
        public string amount { get; set; }
        public DateTime dateofexpense { get; set; }
        public bool IsTerminated { get; set; }
    }
}