using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BusinessEntity
{
    [Table("Book", Schema = "msc")]
    public class Book
    {
        public int Id { get; set; }
        public bool IsTerminated { get; set; }
    }
}