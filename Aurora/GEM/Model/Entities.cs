﻿using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;


namespace GEM.Model
{


	public class Site : ICloneable
	{
		#region Properties
		public List<Geodata> Sites { get; set; } = new List<Geodata>();
		public List<PropertyInfo> Properties { get; set; } = new List<PropertyInfo>(new Geodata().GetType().GetProperties().ToList());
		#endregion

		#region Indexers
		public Geodata this[string siteName] => Sites.Find(geodata => siteName == geodata.name);
		public Geodata this[int index] => Sites.ElementAtOrDefault(index);
		#endregion

		#region Constructor
		public Site(Site clone)
		{
			Sites = clone.Sites;
			Properties = clone.Properties;
		}

		public Site()
		{

		}
		#endregion

		public object Clone() => new Site(this);
	}

	public class Geodata
	{
		[BsonId]
		public string id { get; set; }
		public string name { get; set; }
		public string status { get; set; }
		public Location location { get; set; }
		public DateTime lastModified { get; set; }
		public int minutesOffline { get; set; }
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
