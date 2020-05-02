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
		private readonly IMongoCollection<Geodata> _rawGeodata;

		public GemService(IDatabaseSettings settings)
		{
			var client = new MongoClient(settings.ConnectionString);
			IMongoDatabase database = client.GetDatabase(settings.DatabaseName);
			_rawGeodata = database.GetCollection<Geodata>(settings.Geodata_CollectionName);
		}

		public async Task<List<Geodata>> Get()
		{
			var results = await PipelineDefinitionBuilder(_rawGeodata);
			return results;
		}
		public async Task<Geodata> Get(string filterByName)
		{
			var results = await PipelineDefinitionBuilder(_rawGeodata);
			return results.Find(geodata => geodata.name.Equals(filterByName));
		}


		#region Private Methods
		private async Task<List<Geodata>> PipelineDefinitionBuilder(IMongoCollection<Geodata> collection)
		{
			#region Aggregation Pipeline
			PipelineDefinition<Geodata, Geodata> pipeline = new BsonDocument[] {

				new BsonDocument("$addFields", new BsonDocument("lastModified", new DateTime(2020, 4, 29, 7, 0, 0))),

				new BsonDocument("$addFields",
					new BsonDocument("minutesOffline",
						new BsonDocument("$cond",
							new BsonArray {
								new BsonDocument("$and",
								new BsonArray {
									new BsonDocument("$lt", new BsonArray { "$lastModified", "$$NOW" }),
									new BsonDocument("$eq", new BsonArray { "$status", "offline" })
								}),
								new BsonDocument("$trunc", new BsonDocument("$divide", new BsonArray { new BsonDocument("$subtract", new BsonArray { "$$NOW", "$lastModified" }), 60000 })),
								new BsonDocument("$add", new BsonArray { 0, 0 })
							}
						)
					)
				),

				new BsonDocument("$project",
					new BsonDocument
					{
						{ "name", "$name" },
						{ "status", "$status" },
						{ "lastModified", "$lastModified" },
						{ "minutesOffline", "$minutesOffline" },
						{ "type", "Point" },
						{ "longitude",
							new BsonDocument("$arrayElemAt", new BsonArray { "$location.coordinates", 0 })
						},
						{ "latitude",
							new BsonDocument("$arrayElemAt", new BsonArray { "$location.coordinates", 1 })
						}
					}
				),

				new BsonDocument("$project",
					new BsonDocument
					{
						{ "name", "$name" },
						{ "status", "$status" },
						{ "lastModified", "$lastModified" },
						{ "minutesOffline", "$minutesOffline" },
						{ "location.type", "$type" },
						{ "location.coordinates", new BsonDocument { { "longitude", "$longitude" }, { "latitude", "$latitude" } } }
					}
				),

				new BsonDocument("$sort", new BsonDocument("status", 1))
			};
			#endregion

			// TODO: Don't need following fields in GEM app: id, minutesOffline, longitude, latitude. Filter fields out.
			var aggregation = collection.Aggregate(pipeline);
			return await aggregation.ToListAsync();
		}
		#endregion
	}


	public sealed class TasksService
	{
		// TODO: This needs to be modified to fit specific tasks, right now it is the same code as the GeodataService
		//private readonly IMongoCollection<Geodata> _geodata;

		//public TasksService(IDatabaseSettings settings)
		//{
		//	MongoClient client = new MongoClient(settings.ConnectionString);
		//	IMongoDatabase database = client.GetDatabase(settings.DatabaseName);
		//	_geodata = database.GetCollection<Geodata>(settings.CollectionName);
		//}

		//public List<Geodata> Get() =>
		//	_geodata.Find(geodata => true).ToList();

		//public Geodata Get(string id) =>
		//	_geodata.Find<Geodata>(geodata => geodata._id.Equals(id)).FirstOrDefault();

		//public Geodata Create(Geodata geodata)
		//{
		//	_geodata.InsertOne(geodata);
		//	return geodata;
		//}

		//public void Update(string id, Geodata geodataIn) =>
		//	_geodata.ReplaceOne<Geodata>(geodata => geodata._id.Equals(id), geodataIn);

		//public void Remove(string id, Geodata geodataIn) =>
		//	_geodata.DeleteOne(geodata => geodata._id.Equals(geodataIn._id));

		//public void Remove(string id) =>
		//	_geodata.DeleteOne(geodata => geodata._id.Equals(id));
	}


	public sealed class SubscriptionsService
	{
		// TODO: This needs to be modified to fit specific subscriptions, right now it is the same code as the GeodataService

		//private readonly IMongoCollection<Geodata> _geodata;

		//public SubscriptionsService(IDatabaseSettings settings)
		//{
		//	MongoClient client = new MongoClient(settings.ConnectionString);
		//	IMongoDatabase database = client.GetDatabase(settings.DatabaseName);
		//	_geodata = database.GetCollection<Geodata>(settings.CollectionName);
		//}

		//public List<Geodata> Get() =>
		//	_geodata.Find(geodata => true).ToList();

		//public Geodata Get(string id) =>
		//	_geodata.Find<Geodata>(geodata => geodata._id.Equals(id)).FirstOrDefault();

		//public Geodata Create(Geodata geodata)
		//{
		//	_geodata.InsertOne(geodata);
		//	return geodata;
		//}

		//public void Update(string id, Geodata geodataIn) =>
		//	_geodata.ReplaceOne<Geodata>(geodata => geodata._id.Equals(id), geodataIn);

		//public void Remove(string id, Geodata geodataIn) =>
		//	_geodata.DeleteOne(geodata => geodata._id.Equals(geodataIn._id));

		//public void Remove(string id) =>
		//	_geodata.DeleteOne(geodata => geodata._id.Equals(id));
	}
}
