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
			// TODO: abstract out username and password and cluster name
			var client = new MongoClient("mongodb+srv://Fetcher:GWZdFRSkqkys95wk@cluster0-liruv.azure.mongodb.net/?retryWrites=true&w=majority");
			var db = client.GetDatabase("test_cgr");
			var collection = db.GetCollection<BsonDocument>("test_monitor");
			var filter = Builders<BsonDocument>.Filter.Empty;
			var result = collection.Find(filter).ToList();
			foreach (var doc in result) {
				Console.WriteLine(doc.ToString());
			}
		}
		#endregion
	}
}
