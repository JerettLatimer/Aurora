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

namespace API.Services
{
	public class GemService
	{
		private readonly IMongoCollection<Geodata> _geodata;

		public GemService(IDatabaseSettings settings)
		{
			MongoClient client = new MongoClient(settings.ConnectionString);
			IMongoDatabase database = client.GetDatabase(settings.DatabaseName);
			_geodata = database.GetCollection<Geodata>(settings.CollectionName);
		}

		public List<Geodata> Get()
		{
			var result = _geodata.Find(geodata => true).ToList();
			return result;
		}
		public Geodata Get(string name) => 
			_geodata.Find<Geodata>(geodata => geodata.name.Equals(name)).FirstOrDefault();

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
	}


	public sealed class TasksService
	{
		// TODO: This needs to be modified to fit specific tasks, right now it is the same code as the GeodataService
		private readonly IMongoCollection<Geodata> _geodata;

		public TasksService(IDatabaseSettings settings)
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
	}


	public sealed class SubscriptionsService
	{
		// TODO: This needs to be modified to fit specific subscriptions, right now it is the same code as the GeodataService

		private readonly IMongoCollection<Geodata> _geodata;

		public SubscriptionsService(IDatabaseSettings settings)
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
	}
}
