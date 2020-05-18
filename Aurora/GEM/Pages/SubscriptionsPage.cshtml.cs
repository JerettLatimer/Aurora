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
        private readonly Model.Task _task = new Model.Task();
        private StringValues temp;

        [BindProperty]
        public string FirstName { get; set; }
        [BindProperty]
        public string LastName { get; set; }
        [BindProperty]
        public string Email { get; set; }
        public string GroupName { get; set; }

        public void OnGet()
        {

        }

        public void OnPost(bool ManagerChoice, bool AnalystChoice, bool TechnicianChoice)
        {
            string userName = FirstName + " " + LastName;
            bool managerCheck = Request.Form.TryGetValue("ManagerChoice", out temp);
            bool analystCheck = Request.Form.TryGetValue("AnalystChoice", out temp);
            bool technicianCheck = Request.Form.TryGetValue("TechnicianChoice", out temp);

            if (managerCheck)
            {
                GroupName = "Manager";
            }
            
            if(analystCheck)
            {
                GroupName = "Analyst";
            }

            if(technicianCheck)
            {
                GroupName = "Technician";
            }
            

            Subscriber subscriber = new Subscriber()
            {
                UserName = userName,
                UserEmail = Email
            };

            // Right now this throws an exception because SubscriptionGroup is uninitialized.
            _task.SubscriptionGroup.GroupName = GroupName;
            _task.SubscriptionGroup.Subscribers.Add(subscriber);
        }
    }
}