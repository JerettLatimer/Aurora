using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;

namespace GEM.Model
{
	public class Geodata
	{
		[BsonId]
		public ObjectId _id { get; set; }
		public string name { get; set; }
		public string status { get; set; }
		public Coordinates coordinates { get; set; }
	}

	public class Coordinates
	{
		public double lat { get; set; }
		public double lon { get; set; }
	}
}
