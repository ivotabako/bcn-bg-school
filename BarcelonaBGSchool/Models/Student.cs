using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BarcelonaBGSchool.Models
{
    public class Student
    {
        public Guid Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string Phone { get; set; }

        public string Address { get; set; }

        public string ParentNames { get; set; }

        public string ParentPhoneFirst { get; set; }

        public string ParentPhoneSecond { get; set; }
    }
}
