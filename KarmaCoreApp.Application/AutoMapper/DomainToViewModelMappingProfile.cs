using AutoMapper;
using KarmaCoreApp.Application.ViewModels.Product;
using KarmaCoreApp.Application.ViewModels.System;
using KarmaCoreApp.Data.Entities;

namespace KarmaCoreApp.Application.AutoMapper
{
    public class DomainToViewModelMappingProfile : Profile
    {
        public DomainToViewModelMappingProfile()
        {
            CreateMap<ProductCategory, ProductCategoryViewModel>();
            CreateMap<Product, ProductViewModel>();

            CreateMap<Function, FunctionViewModel>();
        }
    }
}