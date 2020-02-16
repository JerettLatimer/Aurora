using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;

namespace Aurora.Pages
{
    public class MapModel : PageModel
    {
        private readonly ILogger<MapModel> _logger;

        public MapModel(ILogger<MapModel> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {
        }
    }
}
