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
		public List<Task> _tasks = Fetcher._DEMO_TASKS;
		#endregion


		#region Methods
		public void MonitorTasks()
		{

		}



		public void BuildBody(Task task)
		{
			var OldGeo = task.OutdatedSurvey.GetType();
			var NewGeo = task.UpdatedSurvey.GetType();

			task.MessageBody.Append(string.Format("A Task in the {0} subscription profile has reported a change in one or more of its monitored fields: \n", task.SubscriptionGroup.GroupName));
			foreach (string rule in task.SelectedRules) {
				task.MessageBody.Append(string.Format("\t{0}:\n", rule));
				foreach (var newSite in Fetcher.Survey.Sites) {
					var oldSite = task.OutdatedSurvey.Sites.Find(site => site.name == newSite.name);
					if (!oldSite.GetType().GetProperty(rule).Equals(newSite.GetType().GetProperty(rule))) {
						task.MessageBody.Append(string.Format("\t\t{0} = \"{1}\" ---> \"{2}\"\n", newSite.name, oldSite.GetType().GetProperty(rule), newSite.GetType().GetProperty(rule)));
					}
				}
				task.MessageBody.Append(string.Format("\n"));
			}
			PassTaskToNotifier(task);
		}

		private void PassTaskToNotifier(Task task) => new Notifier(task);
		#endregion
	}
}
