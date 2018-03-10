using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BusinessEntity
{
    [Table("Hostel", Schema = "msc")]
    public class Hostel
    {
        public int Id { get; set; }
        public string name { get; set; }
        public string location { get; set; }

        public ICollection<Room> rooms { get; set; }
        public bool IsTerminated { get; set; }
    }
}