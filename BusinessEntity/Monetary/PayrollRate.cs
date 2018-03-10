using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BusinessEntity
{
    [Table("PayrollRate", Schema = "pay")]

    public class PayrollRate
    {
        public int Id { get; set; }
        public double workday{get;set;}
        public double workdayovertime{get;set;}
        public double saturday{get;set;}
        public double saturdayovertime{get;set;}
        public double sunday{get;set;}
        public double sundayovertime{get;set;}
        public double holiday{get;set;}
        public double holidayovertime{get;set;}
        public bool IsTerminated { get; set; }
    }
}