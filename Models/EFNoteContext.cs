using Microsoft.EntityFrameworkCore;

namespace WebLab7.Models
{
    public class EFNoteContext : DbContext
    {
        public EFNoteContext(DbContextOptions<EFNoteContext> opts) : base(opts) { }
        public DbSet<Note> Notes { get; set; }
    }
}
