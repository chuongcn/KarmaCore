using KarmaCoreApp.Data.Enums;
using KarmaCoreApp.Infrastructure.SharedKernel;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KarmaCoreApp.Data.Entities
{
    [Table("ContactDetails")]
    public class Contact : DomainEntity<string>
    {
        public Contact()
        {
        }

        public DbSet<Language> Languages { set; get; }
        public DbSet<SystemConfig> SystemConfigs { get; set; }
        public DbSet<Function> Functions { get; set; }

        public DbSet<AppUser> AppUsers { get; set; }
        public DbSet<AppRole> AppRoles { get; set; }
        public DbSet<Announcement> Announcements { set; get; }
        public DbSet<AnnouncementUser> AnnouncementUsers { set; get; }

        public DbSet<Blog> Bills { set; get; }
        public DbSet<BillDetail> BillDetails { set; get; }
        public DbSet<Blog> Blogs { set; get; }
        public DbSet<BlogTag> BlogTags { set; get; }
        public DbSet<Color> Colors { set; get; }
        public DbSet<Contact> Contacts { set; get; }
        public DbSet<Feedback> Feedbacks { set; get; }
        public DbSet<Footer> Footers { set; get; }
        public DbSet<Page> Pages { set; get; }
        public DbSet<Product> Products { set; get; }
        public DbSet<ProductCategory> ProductCategories { set; get; }
        public DbSet<ProductImage> ProductImages { set; get; }
        public DbSet<ProductQuantity> ProductQuantities { set; get; }
        public DbSet<ProductTag> ProductTags { set; get; }

        public DbSet<Size> Sizes { set; get; }
        public DbSet<Slide> Slides { set; get; }

        public DbSet<Tag> Tags { set; get; }

        public DbSet<Permission> Permissions { get; set; }
        public DbSet<WholePrice> WholePrices { get; set; }

        public DbSet<AdvertisementPage> AdvertisementPages { get; set; }
        public DbSet<Advertisement> Advertisements { get; set; }
        public DbSet<AdvertisementPosition> AdvertisementPositions { get; set; }

        public Contact(string id, string name, string phone, string email, string website, string address,
            string other, double? latitude, double? longtitude, Status status)
        {
            Id = id;
            Name = name;
            Phone = phone;
            Email = phone;
            Website = website;
            Address = address;
            Other = other;
            Lat = latitude;
            Lng = longtitude;
            Status = status;
        }

        [Required]
        [StringLength(250)]
        public string Name { get; set; }

        [StringLength(50)]
        public string Phone { get; set; }

        [StringLength(250)]
        public string Email { get; set; }

        [StringLength(250)]
        public string Website { get; set; }

        [StringLength(250)]
        public string Address { get; set; }

        public string Other { get; set; }

        public double? Lat { get; set; }
        public double? Lng { get; set; }
        public Status Status { get; set; }
    }
}