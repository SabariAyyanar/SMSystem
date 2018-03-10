using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BusinessEntity
{
    [Table("Student", Schema = "std")]
    public class Student
    {
        public int Id { get; set; }
        public string gender { get; set; }
        public string firstname { get; set; }
        public string lastname { get; set; }
        public string placeofbirth { get; set; }
        public DateTime dateofbirth { get; set; }

        public int studentclassId { get; set; }
        [ForeignKey("studentclassId")]
        public StudentClass studentclass { get; set; }
        public int departmentId { get; set; }
        [ForeignKey("departmentId")]
        public  Department department { get; set; }       

        public string mothername { get; set; }
        public string fathername { get; set; }
        public int regionId { get; set; }
        [ForeignKey("regionId")]
        public Region region { get; set; }
        public string city { get; set; }
        public string address { get; set; }

        public string email { get; set; }
        public string phone  { get; set; }
        public int studentstatusId { get; set; }
        [ForeignKey("studentstatusId")]
        public StudentStatus studentstatus { get; set; }
        public double scholarshippercent { get; set; }
        public string imagesrc { get; set; }
        public bool IsTerminated { get; set; }

    }
}