﻿//using KarmaCoreApp.Infrastructure.SharedKernel;
//using System.Collections.Generic;
//using System.ComponentModel.DataAnnotations;
//using System.ComponentModel.DataAnnotations.Schema;

//namespace KarmaCoreApp.Data.Entities
//{
//    [Table("AdvertisementPositions")]
//    public class AdvertisementPosition : DomainEntity<string>
//    {
//        public AdvertisementPosition()
//        {
//            Advertisements = new List<Advertisement>();
//        }

//        [StringLength(20)]
//        public string PageId { get; set; }

//        [StringLength(250)]
//        public string Name { get; set; }

//        [ForeignKey("PageId")]
//        public virtual AdvertisementPage AdvertisementPage { get; set; }

//        public virtual ICollection<Advertisement> Advertisements { get; set; }
//    }
//}