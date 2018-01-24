using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BusinessEntity
{
    [Table("StudentSubject",Schema = "std")]
    public class StudentSubject
    {
        public int Id { get; set; }
        public string name { get; set; }
        public int studentclassid { get; set; }
        public StudentClass studentclass { get; set; }
        public bool IsTerminated { get; set; }
    }
}