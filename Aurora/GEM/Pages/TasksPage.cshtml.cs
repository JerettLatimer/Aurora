using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Aurora;
using GEM.Model;
using HtmlTags;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Newtonsoft.Json;

namespace GEM
{
	public class TasksPageModel : PageModel
	{
		[BindProperty]
		public string GroupName { get; set; }
		[BindProperty]
		public string TaskName { get; set; }

		public void OnPost()
		{
			Fetcher._DEMO_TASKS.First().SubscriptionGroup = Fetcher._DEMO_SUBSCRIPTIONS.Single(sub => sub.GroupName == GroupName);
		}
	}
}

// TODO: pass selection of user 'selected subscription' into currently selected Task's property as well as the 'selected rules' into it's property...
// TODO: create submit button and any other buttons needed for Task menu...