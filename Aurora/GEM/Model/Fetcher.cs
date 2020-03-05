using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using MongoDB.Driver;
using MongoDB.Bson;
using Newtonsoft.Json.Linq;


namespace GEM.Model
{
	public sealed class Fetcher
	{
		#region Properties
		public static Fetcher Instance { get; } = new Fetcher();
		public int Interval { get; set; }
		public List<Geodata> GeodataRouters { get; set; } = new List<Geodata>();
		public List<string> JsonRouters { get; set; } = new List<string>();
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
			var collection = db.GetCollection<Geodata>("test_monitor");
			var toCSharpObject = collection.Find(Builders<Geodata>.Filter.Empty).ToList();
			var toJsonObject = collection.Find(new BsonDocument()).Project(Builders<Geodata>.Projection.Exclude("_id")).ToList();
			toJsonObject.ForEach(result => JsonRouters.Add(result.ToJson().Replace("[", string.Empty).Replace("]", string.Empty).Replace("NumberDecimal(", string.Empty).Replace(")", string.Empty)));
			toCSharpObject.ForEach(result => GeodataRouters.Add(result));
		}
		#endregion
	}
}
