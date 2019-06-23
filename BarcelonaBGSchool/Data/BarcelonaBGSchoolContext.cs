using Microsoft.EntityFrameworkCore;

namespace BarcelonaBGSchool.Models
{
    public class BarcelonaBGSchoolContext : DbContext
    {
        public BarcelonaBGSchoolContext (DbContextOptions<BarcelonaBGSchoolContext> options)
            : base(options)
        {
        }

        public DbSet<Subject> Subject { get; set; }
    }
}
