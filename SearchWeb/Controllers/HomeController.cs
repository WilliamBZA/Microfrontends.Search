using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SearchService;

namespace SearchWeb.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Error()
        {
            ViewData["RequestId"] = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
            return View();
        }

        public async Task<IActionResult> MovieDetails(string movieTitle)
        {
            var searchProvider = new SimpleTitleFilterProvider();


            var movie = (await searchProvider.SearchForMovies(movieTitle)).FirstOrDefault();

            return Json(movie);
        }
    }
}
