using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BusinessEntity
{
    [Table("StudentClass", Schema = "std")]
    public class StudentClass
    {
        public int Id { get; set; }
        public string name { get; set; }
        public double classamounttopay { get; set; }
        public ICollection<StudentSubject> classsubjects { get; set; }
        public bool IsTerminated { get ; set; }
    }
}