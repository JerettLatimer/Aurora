using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using MongoDB.Driver;
using MongoDB.Bson;
using Newtonsoft.Json.Linq;
using System.Timers;
using API.Services;
using API.Controllers;
using API.Models;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Formatting;

namespace GEM.Model
{
	public class Fetcher
	{
		static HttpClient _client;

		public static Site Survey { get; set; } = new Site();


#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously	Justification: Method is called with await operator in an async method. It will not run synchronously.
		public static async Task RunAsync()
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
		{
			_client = new HttpClient {
				//BaseAddress = new Uri("https://localhost:44353/")
				BaseAddress = new Uri("https://aurora-microservices-api.azurewebsites.net/")
			};
			_client.DefaultRequestHeaders.Accept.Clear();
			_client.DefaultRequestHeaders.Accept.Add(
				new MediaTypeWithQualityHeaderValue("application/json"));
		}

		public static async Task<Site> GetGeodataListAsync()
		{
			await RunAsync();
			HttpResponseMessage response = await _client.GetAsync("api/Gem");
			_client.Dispose();

			// 200
			if (response.IsSuccessStatusCode) {
				Survey.Sites = await response.Content.ReadAsAsync<List<Geodata>>();
				return Survey;
			}
			else
			{
				// TODO: Need to handle case where a valid response is not recieved.
				throw new HttpRequestException("404 Error Occurred");
			}
		}
	}
}
