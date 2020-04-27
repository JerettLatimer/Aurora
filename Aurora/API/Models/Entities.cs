using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;
using Newtonsoft.Json;


namespace API.Models
{
	// double latitude = variableOfSiteObject["cgr1"].location.coordinates.latitude;
	public class Site
	{
		public List<Geodata> Sites { get; set; }

		public Geodata this[string siteName]
		{
			get => Sites.Find(geodata => siteName == geodata.name);
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
		public double[] coordinates { get; set; }
		[BsonElement("coordinates")]
		public Coordinates coordinatesObj { get; set; }
	}

	public class Coordinates
	{
		public double longitude { get; set; }
		public double latitude { get; set; }
	}
}
