using AutoMapper;
using KarmaCoreApp.Application.ViewModels.Product;
using KarmaCoreApp.Data.Entities;

namespace KarmaCoreApp.Application.AutoMapper
{
    public class DomainToViewModelMappingProfile : Profile
    {
        public DomainToViewModelMappingProfile()
        {
            CreateMap<ProductCategory, ProductCategoryViewModel>();
        }
    }
}