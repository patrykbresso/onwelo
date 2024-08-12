using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Onwelo.API.Database.Context;
using Onwelo.API.Entities;

namespace Onwelo.API.Database.Mappings
{
    public class CandidateConfiguration : IEntityTypeConfiguration<Candidate>
    {
        public void Configure(EntityTypeBuilder<Candidate> builder)
        {
            builder.ToTable(nameof(OnweloDbContext.Candidates));

            builder.HasKey(p => p.Id);

            builder.HasMany(c => c.Voters)
                   .WithOne(v => v.Candidate)
                   .HasForeignKey(v => v.CandidateId)
                   .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(v => v.Person)
                    .WithOne(p => p.Candidate)
                    .HasForeignKey<Candidate>(v => v.PersonId)
                    .OnDelete(DeleteBehavior.Restrict);
        }
    }
}