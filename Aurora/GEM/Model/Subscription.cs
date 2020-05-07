using System;
using System.Collections.Generic;


namespace GEM.Model
{
	public class Subscription
	{
		public string GroupName { get; internal set; }
		public List<Subscriber> Subscribers { get; internal set; }
	}
}
