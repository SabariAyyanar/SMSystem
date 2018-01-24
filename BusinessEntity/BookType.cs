using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BusinessEntity
{
    [Table("BookType", Schema = "msc")]
    public class BookType
    {
        public int Id { get; set; }
        public bool IsTerminated { get; set; }
    }
}