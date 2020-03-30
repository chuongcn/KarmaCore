using KarmaCoreApp.Data.EF.Extensions;
using KarmaCoreApp.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace KarmaCoreApp.Data.EF.Configurations
{
    public class FooterConfiguration : DbEntityConfiguration<Footer>
    {
        public override void Configure(Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder<Footer> entity)
        {
            entity.HasKey(c => c.Id);
            entity.Property(c => c.Id).HasMaxLength(255)
                .HasColumnType("varchar(255)").IsRequired();
        }
    }
}