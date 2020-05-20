using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using MongoDB.Driver;
using MongoDB.Bson;
using Newtonsoft.Json.Linq;
using API.Services;
using API.Controllers;
using API.Models;
using System.Net.Http;
using System.Net.Http.Headers;


namespace GEM.Model
{
	public class Fetcher
	{
		static HttpClient _client;
		/* DEMO */
		public static List<Subscription> _DEMO_SUBSCRIPTIONS;
		public static List<GEM.Model.Task> _DEMO_TASKS;
		/**/

		public static Site Survey { get; set; } = new Site();


		// TODO: this is what should be triggered when API signals to Fetcher that a Get to the API is needed
		public static async void GetGeodataListAsync()
		{
			RunAsync();
			HttpResponseMessage response = await _client.GetAsync("api/Gem");
			_client.Dispose();

			// 200
			if (response.IsSuccessStatusCode) {
				Survey.Sites = await response.Content.ReadAsAsync<List<Geodata>>();
			}
			else {
				// TODO: Need to handle case where a valid response is not recieved.
				throw new HttpRequestException("404 Error Occurred");
			}
		}

		/* DEMO */
		public static void DEMO_CREATEMOCKOBJECTS()
		{
			_DEMO_SUBSCRIPTIONS = new List<Subscription> {
				new Subscription("Management"),
				new Subscription("Analyst"),
				new Subscription("Technician")
			};
			_DEMO_TASKS = new List<GEM.Model.Task> {
				new GEM.Model.Task {
					TaskName = "Demo Task",
					SubscriptionGroup = _DEMO_SUBSCRIPTIONS[2],
					SelectedRules = {"status" }
				}
			};
		}
		/**/

		public static void RunAsync()
		{
			_client = new HttpClient {
				BaseAddress = new Uri("https://aurora-microservices-api.azurewebsites.net/")
				//BaseAddress = new Uri("https://aurora-microservices-api.azurewebsites.net/")
			};
			_client.DefaultRequestHeaders.Accept.Clear();
			_client.DefaultRequestHeaders.Accept.Add(
				new MediaTypeWithQualityHeaderValue("application/json"));
		}
	}
}
