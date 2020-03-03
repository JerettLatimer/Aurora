using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using MongoDB.Driver;
using MongoDB.Bson;

namespace GEM.Model
{
	public sealed class Fetcher
	{
		#region Properties
		public static Fetcher Instance { get; } = new Fetcher();
		public int Interval { get; set; }
		#endregion

		#region Constructors
		static Fetcher()
		{
		}
		private Fetcher()
		{
			Connect();
		}
		#endregion

		#region Methods
		public void SetInterval(int fetchIntervalInSeconds)
		{
			Interval = fetchIntervalInSeconds;
		}

		private void Connect()
		{
			var client = new MongoClient("mongodb://MattJett:<1234>@cluster0-shard-00-00-liruv.azure.mongodb.net:27017,cluster0-shard-00-01-liruv.azure.mongodb.net:27017,cluster0-shard-00-02-liruv.azure.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority");
			var db = client.GetDatabase("test_cgr");
			var collection = db.GetCollection<CGR>("test_monitor");
			var filter = Builders<CGR>.Filter.Eq(u => u.status, "online");
			var results = collection.Find(filter);
			Console.WriteLine(results.ToString());
		}
		#endregion
	}
}
