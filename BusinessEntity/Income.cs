using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BusinessEntity
{
    [Table("Income", Schema = "msc")]
    public class Income
    {
        public int Id { get; set; }
        
        public int incomecategoryId { get; set; }
        [ForeignKey("incomecategoryId")]
        public IncomeCategory incomecategory { get; set; }
        public string description { get; set; }
        public string amount { get; set; }
        public DateTime dateofincome { get; set; }
        public bool IsTerminated { get; set; }
    }
}