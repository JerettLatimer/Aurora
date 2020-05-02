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
		static readonly HttpClient _client = new HttpClient();

		public Site Survey { get; set; } = new Site();

		public static async Task RunAsync()
		{
			//client.BaseAddress = new Uri("https://localhost:44353/");
			_client.BaseAddress = new Uri("https://localhost:44370/");
			_client.DefaultRequestHeaders.Accept.Clear();
			_client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
		}

		public static async Task<List<Geodata>> GetGeodataListAsync()
		{
			await RunAsync();
			List<Geodata> geodata = null;
			HttpResponseMessage response = await _client.GetAsync("api/Gem");
			if (response.IsSuccessStatusCode)
			{
				geodata = await response.Content.ReadAsAsync<List<Geodata>>();
				return geodata;
			}
			return geodata;
		}

		
	}
}
