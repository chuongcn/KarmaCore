using KarmaCoreApp.Data.Enums;
using System.ComponentModel.DataAnnotations;

namespace KarmaCoreApp.Application.ViewModels.System
{
    public class FunctionViewModel
    {
        public string Id { get; set; }

        [StringLength(128)]
        [Required]
        public string Name { get; set; }

        [StringLength(250)]
        [Required]
        public string URL { get; set; }

        [StringLength(128)]
        public string ParentId { get; set; }

        public string IconCss { get; set; }
        public Status Status { get; set; }
        public int SortOrder { get; set; }
    }
}