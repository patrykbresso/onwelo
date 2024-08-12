using Microsoft.EntityFrameworkCore;
using Onwelo.API.Database.Mappings;
using Onwelo.API.Entities;

namespace Onwelo.API.Database.Context
{
    public class OnweloDbContext : DbContext
    {
        public OnweloDbContext()
        { }

        public OnweloDbContext(DbContextOptions<OnweloDbContext> options) : base(options)
        {
        }

        public virtual DbSet<Candidate> Candidates { get; set; }

        public virtual DbSet<Person> People { get; set; }

        public virtual DbSet<Voter> Voters { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                IConfiguration configuration = new ConfigurationBuilder()
                  .SetBasePath(Directory.GetCurrentDirectory())
                  .AddJsonFile("appsettings.json")
                  .Build();

                optionsBuilder.UseSqlServer(configuration.GetConnectionString("Database"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfiguration(new PersonConfiguration());
            modelBuilder.ApplyConfiguration(new CandidateConfiguration());
            modelBuilder.ApplyConfiguration(new VoterConfiguration());
        }
    }
}