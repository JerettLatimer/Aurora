using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;


namespace GEM.Model
{
	// double latitude = varOfSites["cgr1"].location.coordinates.latitude;
	public class Sites
	{
		public List<Geodata> sites { get; set; }

		public Geodata this[string siteName]
		{
			get => sites.Find(geodata => siteName == geodata.name);
			set
			{

			}
		}
	}

	public class Geodata
	{
		[BsonId]
		public ObjectId _id { get; set; }
		public string name { get; set; }
		public string status { get; set; }
		public Location location { get; set; }
	}

	public class Location
	{
		public string type { get; set; }
		public Coordinates coordinates { get; set; }
	}

	public class Coordinates
	{
		public double longitude { get; set; }
		public double latitude { get; set; }
	}
}
