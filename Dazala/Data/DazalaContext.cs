using Microsoft.EntityFrameworkCore;
using Dazala.Models;

namespace Dazala.Data
{
    public class DazalaContext : DbContext
    {
        public DazalaContext (DbContextOptions<DazalaContext> options)
            : base(options)
        {
        }

        public DbSet<Product> Product { get; set; }
    }
}