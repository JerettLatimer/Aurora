using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;

namespace Aurora.Pages
{
    public class LiveMapPageModel : PageModel
    {
        private readonly ILogger<LiveMapPageModel> _logger;

        public LiveMapPageModel(ILogger<LiveMapPageModel> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {
        }
    }
}
