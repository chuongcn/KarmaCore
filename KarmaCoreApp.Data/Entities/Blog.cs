using KarmaCoreApp.Data.Enums;
using KarmaCoreApp.Data.Interfaces;
using KarmaCoreApp.Infrastructure.SharedKernel;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KarmaCoreApp.Data.Entities
{
    [Table("Blogs")]
    public class Blog : DomainEntity<int>, ISwitchable, IDateTracking, IHasSeoMetaData
    {
        public Blog()
        {
        }

        public Blog(string name, string thumbnailImage, string description, string content, bool? homeFlag, bool? hotFlag,
            string tags, Status status, string seoPageTitle, string seoAlias, string seoKeywords, string seoDescription)
        {
            Name = name;
            Image = thumbnailImage;
            Description = description;
            Content = content;
            HomeFlag = homeFlag;
            HotFlag = hotFlag;
            Tags = tags;
            Status = status;
            SeoPageTitle = seoPageTitle;
            SeoAlias = seoAlias;
            SeoKeywords = seoKeywords;
            SeoDescription = seoDescription;
        }

        public Blog(int id, string name, string thumbnailImage, string description, string content, bool? homeFlag, bool? hotFlag,
            string tags, Status status, string seoPageTitle, string seoAlias, string seoKeywords, string seoDescription)
        {
            Id = id;
            Name = name;
            Image = thumbnailImage;
            Description = description;
            Content = content;
            HomeFlag = homeFlag;
            HotFlag = hotFlag;
            Tags = tags;
            Status = status;
            SeoPageTitle = seoPageTitle;
            SeoAlias = seoAlias;
            SeoKeywords = seoKeywords;
            SeoDescription = seoDescription;
        }

        [Required]
        [MaxLength(256)]
        public string Name { get; set; }

        [MaxLength(256)]
        public string Image { get; set; }

        [MaxLength(500)]
        public string Description { get; set; }

        public string Content { get; set; }
        public bool? HomeFlag { get; set; }
        public bool? HotFlag { get; set; }
        public int? ViewCount { get; set; }
        public string Tags { get; set; }
        public virtual ICollection<BlogTag> BlogTags { get; set; }
        public Status Status { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }

        [MaxLength(256)]
        public string SeoPageTitle { get; set; }

        [MaxLength(256)]
        public string SeoAlias { get; set; }

        [MaxLength(256)]
        public string SeoKeywords { get; set; }

        [MaxLength(256)]
        public string SeoDescription { get; set; }
    }
}