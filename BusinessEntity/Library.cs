using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BusinessEntity
{
    [Table("Library", Schema = "msc")]
    public class Library
    {
        public int Id { get; set; }
        public bool IsTerminated { get; set; }
    }
}