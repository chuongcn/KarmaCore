//using KarmaCoreApp.Infrastructure.SharedKernel;
//using System.Collections.Generic;
//using System.ComponentModel.DataAnnotations.Schema;

//namespace KarmaCoreApp.Data.Entities
//{
//    [Table("AdvertisementPages")]
//    public class AdvertisementPage : DomainEntity<string>
//    {
//        public AdvertisementPage()
//        {
//            AdvertisementPositions = new List<AdvertisementPosition>();
//        }

//        public string Name { get; set; }

//        public virtual ICollection<AdvertisementPosition> AdvertisementPositions { get; set; }
//    }
//}