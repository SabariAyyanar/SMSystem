using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BusinessEntity
{
    [Table("Transport",Schema = "msc")]
    public class Transport
    {
        public int Id { get; set; }
        public bool IsTerminated { get; set; }
    }
}