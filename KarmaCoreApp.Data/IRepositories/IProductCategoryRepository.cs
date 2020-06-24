using KarmaCoreApp.Data.Entities;
using KarmaCoreApp.Infrastructure.Interfaces;
using System.Collections.Generic;

namespace KarmaCoreApp.Data.IRepositories
{
    public interface IProductCategoryRepository : IRepository<ProductCategory, int>
    {
        List<ProductCategory> GetByAlias(string alias);
    }
}