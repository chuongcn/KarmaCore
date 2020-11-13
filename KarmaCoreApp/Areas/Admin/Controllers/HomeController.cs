using KarmaCoreApp.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace KarmaCoreApp.Areas.Admin.Controllers
{    
    public class HomeController : BaseController
    {
        public IActionResult Index()
        {
            var email = User.GetSpecificClaim("Email");
            return View();
        }
    }
}