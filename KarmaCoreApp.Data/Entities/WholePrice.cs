using KarmaCoreApp.Infrastructure.SharedKernel;
using System.ComponentModel.DataAnnotations.Schema;

namespace KarmaCoreApp.Data.Entities
{
    [Table("WholePrices")]
    public class WholePrice : DomainEntity<int>
    {
        public int ProductId { get; set; }
        public int FromQuantity { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }

        [ForeignKey("ProductId")]
        public virtual Product Product { get; set; }
    }
}