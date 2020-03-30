using KarmaCoreApp.Data.Enums;
using KarmaCoreApp.Data.Interfaces;
using KarmaCoreApp.Infrastructure.SharedKernel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KarmaCoreApp.Data.Entities
{
    [Table("Pages")]
    public class Page : DomainEntity<int>, ISwitchable
    {
        [MaxLength(256)]
        [Required]
        public string Name { get; set; }

        [MaxLength(256)]
        [Required]
        public string Alias { get; set; }

        public string Content { get; set; }

        public Status Status { get; set; }
    }
}