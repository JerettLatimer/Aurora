using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using MongoDB.Driver;
using MongoDB.Bson;
using Newtonsoft.Json.Linq;
using System.Timers;
using API.Models;

namespace GEM.Model
{
	public sealed class GeodataService
	{
		private readonly IMongoCollection<Geodata> _geodata;

		public GeodataService(IDatabaseSettings settings)
		{
			MongoClient client = new MongoClient(settings.ConnectionString);
			IMongoDatabase database = client.GetDatabase(settings.DatabaseName);
			_geodata = database.GetCollection<Geodata>(settings.CollectionName);
		}

		public List<Geodata> Get() => 
			_geodata.Find(geodata => true).ToList();

		public Geodata Get(string id) => 
			_geodata.Find<Geodata>(geodata => geodata._id.Equals(id)).FirstOrDefault();

		public Geodata Create(Geodata geodata)
		{
			_geodata.InsertOne(geodata);
			return geodata;
		}

		public void Update(string id, Geodata geodataIn) =>
			_geodata.ReplaceOne<Geodata>(geodata => geodata._id.Equals(id), geodataIn);

		public void Remove(string id, Geodata geodataIn) =>
			_geodata.DeleteOne(geodata => geodata._id.Equals(geodataIn._id));

		public void Remove(string id) =>
			_geodata.DeleteOne(geodata => geodata._id.Equals(id));



		#region Singleton
		#region Properties
		public static GeodataService Instance { get; } = new GeodataService();
		public Timer Interval { get; set; }
		public Site Survey { get; set; } = new Site();
		#endregion

		#region Constructors
		static GeodataService(){}
		private GeodataService(){}
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
		#endregion
	}


	public sealed class TasksService
	{
		#region Singleton
		#region Properties
		public static TasksService Instance { get; } = new TasksService();
		public Timer Interval { get; set; }
		public Site Survey { get; set; } = new Site();
		#endregion

		#region Constructors
		static TasksService() { }
		private TasksService() { }
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
		#endregion
	}


	public sealed class SubscriptionsService
	{
		#region Singleton
		#region Properties
		public static SubscriptionsService Instance { get; } = new SubscriptionsService();
		public Timer Interval { get; set; }
		public Site Survey { get; set; } = new Site();
		#endregion

		#region Constructors
		static SubscriptionsService() { }
		private SubscriptionsService() { }
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
		#endregion
	}
}
