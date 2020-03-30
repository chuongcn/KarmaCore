using KarmaCoreApp.Data.Enums;
using KarmaCoreApp.Data.Interfaces;
using KarmaCoreApp.Infrastructure.SharedKernel;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KarmaCoreApp.Data.Entities
{
    [Table("Announcements")]
    public class Announcement : DomainEntity<string>, ISwitchable, IDateTracking
    {
        public Announcement()
        {
            AnnouncementUsers = new List<AnnouncementUser>();
        }

        [Required]
        [StringLength(250)]
        public string Title { get; set; }

        [StringLength(250)]
        public string Content { get; set; }

        public Guid UserId { get; set; }

        [ForeignKey("UserId")]
        public virtual AppUser AppUser { get; set; }

        public virtual ICollection<AnnouncementUser> AnnouncementUsers { get; set; }

        public string Name { get; set; }
        public DateTime DateCreated { set; get; }
        public DateTime DateModified { set; get; }
        public Status Status { set; get; }
    }
}