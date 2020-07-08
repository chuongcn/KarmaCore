using KarmaCoreApp.Application.Interfaces;
using KarmaCoreApp.Application.ViewModels.System;
using KarmaCoreApp.Extensions;
using KarmaCoreApp.Utilities.Constants;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace KarmaCoreApp.Areas.Admin.Components
{
    public class SideBarViewComponent : ViewComponent
    {
        IFunctionService _functionService;
        public SideBarViewComponent(IFunctionService functionService)
        {
            _functionService = functionService;
        }

        public async Task<IViewComponentResult> InvokeAsync()
        {
            var roles = ((ClaimsPrincipal)User).GetSpecificClaim("Roles");
            List<FunctionViewModel> functions;
            if (roles.Split(";").Contains(CommonConstants.AdminRole))
            {
                functions = await _functionService.GetAll();
            }
            else
            {
                //TODO: Get by permission
                functions = new List<FunctionViewModel>();
            }
            return View(functions);
        }
    }
}