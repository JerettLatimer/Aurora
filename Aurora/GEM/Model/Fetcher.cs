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
		public Fetcher()
		{

		public Site Survey { get; set; } = new Site();

		static HttpClient client;

		public static async Task RunAsync()
		{
			client = new HttpClient();
			client.BaseAddress = new Uri("https://localhost:44353/");
			client.DefaultRequestHeaders.Accept.Clear();
			client.DefaultRequestHeaders.Accept.Add(
				new MediaTypeWithQualityHeaderValue("application/json"));
		}

		public static async Task<List<Geodata>> GetGeodataListAsync()
		{
			await RunAsync();
			HttpResponseMessage response = await client.GetAsync("api/Gem");
			if(response.IsSuccessStatusCode)
			{
				Survey.Sites = await response.Content.ReadAsAsync<List<Geodata>>();
				return Survey.Sites;
			}
			client.Dispose();
			// TODO: Need to handle case where a valid response is not recieved.
			return Survey.Sites;
		}
	}
}
