using KarmaCoreApp.Application.ViewModels.Product;
using KarmaCoreApp.Utilities.Dtos;
using System;
using System.Collections.Generic;

namespace KarmaCoreApp.Application.Interfaces
{
    public interface IProductService : IDisposable
    {
        List<ProductViewModel> GetAll();

        PagedResult<ProductViewModel> GetAllPaging(int? categoryId, string keyword, int page, int pageSize);
    }
}