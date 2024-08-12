using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Onwelo.API.Database.Context;
using Onwelo.API.Entities;

namespace Onwelo.API.Database.Mappings
{
    public class VoterConfiguration : IEntityTypeConfiguration<Voter>
    {
        public void Configure(EntityTypeBuilder<Voter> builder)
        {
            builder.ToTable(nameof(OnweloDbContext.Voters));

            builder.HasKey(p => p.Id);

            builder.HasOne(v => v.Candidate)
                   .WithMany(c => c.Voters)
                   .HasForeignKey(v => v.CandidateId)
                   .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(v => v.Person)
                    .WithOne(p => p.Voter)
                    .HasForeignKey<Voter>(v => v.PersonId)
                    .OnDelete(DeleteBehavior.Restrict);
        }
    }
}