using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BusinessEntity
{
    [Table("User", Schema = "app")]
    public class AppUser
    {
        public int Id { get; set; }

        public string username { get; set; }

        public string password { get; set; }

        public string email { get; set; }
        public string alterEgo { get; set; }
        public bool IsTerminated { get; set; }
    }
}