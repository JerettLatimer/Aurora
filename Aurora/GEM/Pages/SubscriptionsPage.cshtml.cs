using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using GEM.Model;
using System.Web;
using Microsoft.Extensions.Primitives;

namespace GEM
{
    public class SubscriptionsPageModel : PageModel
    {
        [BindProperty]
        public string FirstName { get; set; }
        [BindProperty]
        public string LastName { get; set; }
        [BindProperty]
        public string Email { get; set; }
        [BindProperty]
        public string GroupName { get; set; }


        public void OnPost()
        {
            string userName = FirstName + " " + LastName;

            var subscriber = new Subscriber()
            {
                UserName = userName,
                UserEmail = Email
            };

            Fetcher._DEMO_SUBSCRIPTIONS.Single(sub => sub.GroupName == GroupName).Subscribers.Add(subscriber);
        }
    }
}