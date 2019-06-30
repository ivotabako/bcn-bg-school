using Microsoft.EntityFrameworkCore;

namespace BarcelonaBGSchool.Models
{
    public class BarcelonaBGSchoolContext : DbContext
    {
        public BarcelonaBGSchoolContext (DbContextOptions<BarcelonaBGSchoolContext> options)
            : base(options)
        {
        }

        public DbSet<Subject> Subjects { get; set; }

        public DbSet<Group> Groups { get; set; }
    }
}
