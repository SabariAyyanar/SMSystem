using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BusinessEntity
{
    [Table("SSNITRate", Schema = "pay")]

    public class SSNITRate
    {
        public int Id { get; set; }
        public string name { get; set; }
        public double Rate { get; set; }
        public bool IsTerminated { get; set; }
    }
}