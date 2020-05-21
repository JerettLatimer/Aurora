using System;
using System.Collections.Generic;
using System.Data;
using System.Text;


namespace GEM.Model
{
	public class Task
	{
		#region Properties
		public string TaskName { get; internal set; }
		public Site OutdatedSurvey { get; internal set; } = Fetcher.Survey; // When Fetcher signals to Tasker that new Geodata was just pulled from the API, Tasker class will only update this property if a Tasker template pattern was executed in full
		public Site UpdatedSurvey { get; internal set; } = Fetcher.Survey; // When Fetcher signals to Tasker that new Geodata was just pulled from the API, Tasker class will update this property with the newer Fetcher.Survey property
		public List<string> SelectedRules { get; internal set; } = new List<string>(); // Tasker class will List.Add() each field select into this list to keep track of only the fields the user cares about
		public StringBuilder MessageBody { get; internal set; } = new StringBuilder(); // Tasker class will use this to builder the email body in each IF statement foreach field selected
		public Subscription SubscriptionGroup { get; internal set; } // Tasker class will use this property to add which ever the user selects as their Subscription they want this Task assigned to
		#endregion


		#region Class Methods
		#endregion
	}
}
