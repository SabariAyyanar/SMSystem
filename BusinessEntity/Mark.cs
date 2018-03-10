using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BusinessEntity
{
    [Table("Mark",Schema ="std")]
    public class Mark
    {
        public int Id { get; set; }
        public int studentsubjectId { get; set; }
        [ForeignKey("studentsubjectId")]
        public StudentSubject studentsubject { get; set; }
        
        public int examId { get; set; }
        public Exam exam { get; set; }
        public double mark { get; set; }
        public int IsTerminated { get; set; }
    }
}