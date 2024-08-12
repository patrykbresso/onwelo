using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using Onwelo.API.Entities;
using Onwelo.API.Database.Context;

namespace Onwelo.API.Database.Mappings
{
    public class PersonConfiguration : IEntityTypeConfiguration<Person>
    {
        public void Configure(EntityTypeBuilder<Person> builder)
        {
            builder.ToTable(nameof(OnweloDbContext.People));

            builder.HasKey(p => p.Id);

            builder.Property(p => p.FullName)
                   .IsRequired()
                   .HasMaxLength(100);
        }
    }
}