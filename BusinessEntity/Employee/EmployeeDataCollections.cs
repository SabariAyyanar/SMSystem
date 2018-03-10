using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BusinessEntity
{
    [Table("EmployeeDataCollections", Schema = "emp")]
    public class EmployeeDataCollections
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsTerminated { get; set; }
    }
}