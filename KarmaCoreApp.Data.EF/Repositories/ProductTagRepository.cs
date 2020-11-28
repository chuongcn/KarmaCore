using KarmaCoreApp.Data.Entities;
using KarmaCoreApp.Data.IRepositories;

namespace KarmaCoreApp.Data.EF.Repositories
{
    public class ProductTagRepository : EFRepository<ProductTag, int>, IProductTagRepository
    {
        public ProductTagRepository(AppDbContext context) : base(context)
        {
        }
    }
}