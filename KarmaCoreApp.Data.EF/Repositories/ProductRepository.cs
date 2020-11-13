using KarmaCoreApp.Data.Entities;
using KarmaCoreApp.Data.IRepositories;

namespace KarmaCoreApp.Data.EF.Repositories
{
    public class ProductRepository : EFRepository<Product, int>, IProductRepository
    {
        public ProductRepository(AppDbContext context) : base(context)
        {
        }
    }
}