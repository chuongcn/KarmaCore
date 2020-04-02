using KarmaCoreApp.Data.Enums;
using KarmaCoreApp.Infrastructure.SharedKernel;
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