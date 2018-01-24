using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BusinessEntity
{
    [Table("Region", Schema = "app")]

    public class Region
    {
        public int Id { get; set; }
        public string name { get; set; }
        public bool IsTerminated { get; set; }
    }
}