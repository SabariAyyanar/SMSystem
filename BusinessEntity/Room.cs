using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BusinessEntity
{
    [Table("Room", Schema = "msc")]
    public class Room
    {
        public int Id { get; set; }
        public int hostelId { get; set; }
        public Hostel hostel { get; set; }
        public string name { get; set; }
        public int costperroom { get; set; }
        public int studentperroom { get; set; }
        public bool IsTerminated { get; set; }
    }
}