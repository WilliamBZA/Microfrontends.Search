using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ITOps.Composition;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace SearchWeb.Controllers
{
    [Route("api/[controller]")]
    public class DataController : Controller
    {
        RequestComposer composer;

        public DataController(RequestComposer composer)
        {
            this.composer = composer;
        }

        [HttpGet]
        public async Task<dynamic> Get(string id)
        {
            return await composer.ServiceRequest(Request.HttpContext);
        }
    }
}