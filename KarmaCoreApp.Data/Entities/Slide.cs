using KarmaCoreApp.Infrastructure.SharedKernel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KarmaCoreApp.Data.Entities
{
    [Table("Slides")]
    public class Slide : DomainEntity<int>
    {
        [StringLength(250)]
        [Required]
        public string Name { get; set; }

        [StringLength(250)]
        [Required]
        public string Description { get; set; }

        [StringLength(250)]
        [Required]
        public string Image { get; set; }

        [StringLength(250)]
        public string Url { get; set; }

        public int? DisplayOrder { get; set; }

        public bool Status { get; set; }

        public string Content { get; set; }

        [StringLength(250)]
        [Required]
        public string GroupAlias { get; set; }
    }
}