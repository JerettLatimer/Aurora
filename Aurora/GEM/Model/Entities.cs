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
}
