using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace GEM.Model
{

	public class Site
	{
		public List<Geodata> Sites { get; set; }

		public Geodata this[string siteName] => Sites.Find(geodata => siteName == geodata.name);
	}

	public class Geodata
	{
		public string _id { get; set; }
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
