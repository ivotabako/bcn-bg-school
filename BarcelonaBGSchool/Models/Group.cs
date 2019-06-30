using Microsoft.AspNetCore.Mvc;
using System;

namespace BarcelonaBGSchool.Models
{
    [BindProperties(SupportsGet = true)]
    public class Group
    {
        public Guid Id { get; set; }

        [BindProperty(Name = "group_name", SupportsGet = true)]
        public string Name { get; set; }

        [BindProperty(Name = "year_started", SupportsGet = true)]
        public DateTime YearStarted { get; set; }
    }
}
