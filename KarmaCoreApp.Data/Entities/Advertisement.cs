using KarmaCoreApp.Data.Enums;
using KarmaCoreApp.Data.Interfaces;
using KarmaCoreApp.Infrastructure.SharedKernel;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KarmaCoreApp.Data.Entities
{
    [Table("Advertisements")]
    public class Advertisement : DomainEntity<int>, ISwitchable, ISortable, IDateTracking
    {
        [StringLength(250)]
        public string Name { get; set; }

        [StringLength(250)]
        public string Description { get; set; }

        [StringLength(250)]
        public string Image { get; set; }

        [StringLength(250)]
        public string Url { get; set; }

        [StringLength(250)]
        public string PositionId { get; set; }

        public Status Status { set; get; }
        public int SortOrder { set; get; }
        public DateTime DateCreated { set; get; }
        public DateTime DateModified { set; get; }

        [ForeignKey("PositionId")]
        public virtual AdvertisementPosition AdvertisementPosition { get; set; }
    }
}