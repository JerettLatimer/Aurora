﻿using System;
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
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace GEM
{
	public class TasksPageModel : PageModel
	{
		[Required]
		[BindProperty]
		public string GroupName { get; set; }
		[Required]
		[BindProperty]
		public string TaskName { get; set; }
		[Required]
		[BindProperty]
		public string Checkboxes { get; set; }

		public void OnPost()
		{
			Fetcher._DEMO_TASKS.First().SubscriptionGroup = Fetcher._DEMO_SUBSCRIPTIONS.Single(sub => sub.GroupName == GroupName);
			string[] array = Checkboxes.Trim('[').Trim(']').Replace("\"", String.Empty).Split(",");
			Fetcher._DEMO_TASKS.First().SelectedRules = array.ToList<string>();
		}
	}
}
