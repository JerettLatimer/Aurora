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
		public List<GEM.Model.Task> DEMOTASKS = Fetcher._DEMO_TASKS;
		public List<Subscription> DEMOSUBSCRIPTIONS = Fetcher._DEMO_SUBSCRIPTIONS;
		public Site SITE = Fetcher.Survey;
	}
}

// TODO: pass selection of user 'selected subscription' into currently selected Task's property as well as the 'selected rules' into it's property...
// TODO: create submit button and any other buttons needed for Task menu...