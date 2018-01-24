using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BusinessEntity
{
    [Table("Employee", Schema = "emp")]
    public class Employee
    {
        public int Id { get; set; }
        public string gender { get; set; }
        public string firstname { get; set; }
        public string lastname { get; set; }
        public string fullname { get; set; }
        public string placeofbirth { get; set; }
        public DateTime dateofbirth { get; set; }
        public int categoryId { get; set; }
        [ForeignKey("categoryId")]
        public EmployeeCategory category { get; set; }
        public int departmentId { get; set; }
        [ForeignKey("departmentId")]
        public Department department { get; set; }
        public int classtoteachId { get; set; }
        [ForeignKey("classtoteachId")]
        public StudentClass classtoteach { get; set; }
        public string mothername { get; set; }
        public string fathername { get; set; }
        public int regionId { get; set; }
        [ForeignKey("regionId")]
        public Region region { get; set; }
        public string city { get; set; }
        public string address { get; set; }

        public string email { get; set; }
        public string phone { get; set; }
        public string areaofexpertise { get; set; }
        public int levelofeducationId { get; set; }
        [ForeignKey("levelofeducationId")]
        public EmployeeLevelOfEducation levelofeducation { get; set; }
        public double yearsofexperience { get; set; }

        public double salary { get; set; }
        public double workinghours { get; set; }

        public string imagesrc { get; set; }

        public int employeetypeId { get; set; }
        [ForeignKey("employeetypeId")]
        public EmployeeType employeetype { get; set; }
        // used to check if payroll has been created
        public bool iscurrentpayrollamount { get; set; }
        public bool IsTerminated { get; set; }
    }
}