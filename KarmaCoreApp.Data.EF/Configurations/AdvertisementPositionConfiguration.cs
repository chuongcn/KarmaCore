using KarmaCoreApp.Data.EF.Extensions;
using KarmaCoreApp.Data.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace KarmaCoreApp.Data.EF.Configurations
{
    public class AdvertisementPositionConfiguration : DbEntityConfiguration<AdvertisementPosition>
    {
        public override void Configure(EntityTypeBuilder<AdvertisementPosition> entity)
        {
            entity.Property(c => c.Id).HasMaxLength(20).IsRequired();
        }
    }
}