using System;
using System.Collections.Generic;


namespace GEM.Model
{
	public class Subscription
	{
		#region Properties
		public string GroupName { get; internal set; }
		public List<Subscriber> Subscribers { get; internal set; } = new List<Subscriber>();
		#endregion

		#region Constructors
		public Subscription(string name)
		{
			GroupName = name;
		}
		#endregion
	}
}
