using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options)
            : base(options) { }

        public DbSet<Activity> Activities { get; set; }
        public DbSet<ActivityAttendees> ActivityAttendees { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<ActivityAttendees>(
                // Specifying primary key
                aa => aa.HasKey(aa => new { aa.AppUserId, aa.ActivityId })
            );

            builder
                .Entity<ActivityAttendees>()
                .HasOne(aa => aa.AppUser)
                .WithMany(user => user.Activities)
                .HasForeignKey(aa => aa.AppUserId);

            builder
                .Entity<ActivityAttendees>()
                .HasOne(aa => aa.Activity)
                .WithMany(activity => activity.Attendees)
                .HasForeignKey(aa => aa.ActivityId);
        }
    }
}
