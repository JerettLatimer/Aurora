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

namespace GEM.Model
{
	public class Fetcher
	{
		public Fetcher()
		{

		}
		//public Site Survey { get; set; } = new Site();
		public API.Models.Site Survey { get; set; } = new API.Models.Site();
		public GemController GemController { get; set; } = new GemController();

		static HttpClient client = new HttpClient();

		public static async Task RunAsync()
		{
			client.BaseAddress = new Uri("https://localhost:44337/");
			client.DefaultRequestHeaders.Accept.Clear();
			client.DefaultRequestHeaders.Accept.Add(
				new MediaTypeWithQualityHeaderValue("application/json"));
		}

		public static async Task<List<Geodata>> GetGeodataListAsync()
		{
			await RunAsync();
			List<Geodata> geodata = null;
			string jsonReturn = "";
			HttpResponseMessage response = await client.GetAsync("api/GemController");
			if(response.IsSuccessStatusCode)
			{
				jsonReturn = await response.Content.ReadAsStringAsync();
				geodata = JsonConvert.DeserializeObject<List<Geodata>>(jsonReturn);
				return geodata;
			}
			return geodata;
		}

		/*#region Singleton
		#region Properties
		public static Fetcher Instance { get; } = new Fetcher();
		public Timer Interval { get; set; }
		public Site Survey { get; set; } = new Site();
		#endregion

		#region Constructors
		static Fetcher(){}
		private Fetcher(){}
		#endregion
		#endregion

		#region Methods
		public void SetInterval(int fetchIntervalInSeconds)
		{
			Interval = new Timer(fetchIntervalInSeconds * 1000);
		}

		public void Start()
		{
			Connect();
		}

		private void Connect()
		{
			// TODO: abstract out username and password and cluster name, maybe manifest.json <encrypted>
			var client = new MongoClient("mongodb+srv://Fetcher:GWZdFRSkqkys95wk@cluster0-liruv.azure.mongodb.net/?retryWrites=true&w=majority");
			var db = client.GetDatabase("test_cgr");
			var collection = db.GetCollection<Geodata>("test_monitor");

			// TODO: new Thread??? Forrest make a s=asynchyoncuisuasfdioh call in Time.Intervals of Interval Fetcher property.
			Query(collection);
		}

		private void Query(IMongoCollection<Geodata> collection)
		{
			Survey.Sites = collection.Find(Builders<Geodata>.Filter.Empty).ToList();
		}
		#endregion*/
	}
}
