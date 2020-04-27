using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;


namespace GEM.Model
{

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
		//[BsonId]
		//[BsonElement("_id")]
		//[BsonRepresentation(BsonType.ObjectId)]
		public string _id { get; set; }
		public string name { get; set; }
		public string status { get; set; }
		public Location location { get; set; }
	}

	public class Location
	{
		public string type { get; set; }
		public double[] coordinates { get; set; }
	}



	// double latitude = variableOfSiteObject["cgr1"].location.coordinates.latitude;
	/*public class Site
	{
		public List<Geodata> Sites { get; internal set; }

		public Geodata this[string siteName]
		{
			get => Sites.Find(geodata => siteName == geodata.name);
		}
	}

	public class Geodata
	{
		[BsonId]
		public ObjectId _id { get; internal set; }
		public string name { get; internal set; }
		public string status { get; internal set; }
		public Location location { get; internal set; }
	}

	public class Location
	{
		public string type { get; internal set; }
		public Coordinates coordinates { get; internal set; }

		[JsonProperty("coordinates")]
		public double[] coordinatesArray { get; set; }
	}

	public class Coordinates
	{
		public double longitude { get; internal set; }
		public double latitude { get; internal set; }
	}*/
}
