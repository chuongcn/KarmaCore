using KarmaCoreApp.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace KarmaCoreApp.Areas.Admin.Controllers
{
    [Area("Admin")]
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            var email = User.GetSpecificClaim("Email");
            return View();
        }
    }
}