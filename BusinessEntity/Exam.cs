using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BusinessEntity
{
    [Table("Exam",Schema ="std")]
    public class Exam
    {
        public int Id { get; set; }
        public int studentId { get; set; }
        [ForeignKey("studentId")]
        public Student student { get; set; }
        public List<Mark> marks { get; set; }
        public bool IsTerminated { get; set; }
    }
}