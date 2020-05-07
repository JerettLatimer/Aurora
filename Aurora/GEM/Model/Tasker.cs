using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace GEM.Model
{
	public class Tasker
	{
		#region Properties
		#endregion


		#region Methods
		private void BuildBody(Task task)
		{
			var OldGeo = task.OutdatedSurvey.GetType();
			var NewGeo = task.UpdatedSurvey.GetType();
			var GeoProps = new Geodata().GetType().GetProperties();

			task.MessageBody.Append(string.Format("A Task in the {0} subscription profile has reported a change in one or more of its monitored fields: \n", task.SubscriptionGroup.GroupName));
			foreach (string rule in task.SelectedRules) {
				task.MessageBody.Append(string.Format("\t{0}:\n", rule));
				// Look in each Site in Sites that have a mismatching value from oldSite to newSite
				foreach (var newSite in Fetcher.Survey.Sites) {
					var oldSite = task.OutdatedSurvey.Sites.Find(site => site.name == newSite.name);
					if (!oldSite.GetType().GetProperty(rule).Equals(newSite.GetType().GetProperty(rule))) {
						task.MessageBody.Append(string.Format("\t\t{0} = \"{1}\" ---> \"{2}\"\n", newSite.name, oldSite.GetType().GetProperty(rule), newSite.GetType().GetProperty(rule)));
					}
				}
				task.MessageBody.Append(string.Format("\n"));
			}
			SendTask(task);
		}

		private void SendTask(Task task) => new Notifier(task);
		#endregion
	}
}
