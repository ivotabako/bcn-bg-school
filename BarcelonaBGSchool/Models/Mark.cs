using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BarcelonaBGSchool.Models
{
    public class Mark
    {
        public Guid Id { get; set; }

        public Guid SubjectId { get; set; }
        public Subject Subject { get; set; }

        public Guid StudentId { get; set; }
        public Student Student { get; set; }
        public Guid GroupId { get; set; }
        public Group Group { get; set; }

        public string MarkValue { get; set; }
        public DateTime Date { get; set; }

        public MarkType MarkType { get; set; }
    }
}
