using KarmaCoreApp.Data.Enums;
using KarmaCoreApp.Data.Interfaces;
using KarmaCoreApp.Infrastructure.SharedKernel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KarmaCoreApp.Data.Entities
{
    [Table("Languages")]
    public class Language : DomainEntity<string>, ISwitchable
    {
        [StringLength(128)]
        [Required]
        public string Name { get; set; }

        public bool IsDefault { get; set; }
        public string Resources { get; set; }
        public Status Status { get; set; }
    }
}