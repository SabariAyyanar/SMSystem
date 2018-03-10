using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BusinessEntity
{
    [Table("AppUserRole", Schema = "app")]
    public class AppUserRole
    {
        public int Id { get; set; }
        public string role { get; set; }
        public string description { get; set; }
        public bool IsTerminated { get; set; }
    }
}