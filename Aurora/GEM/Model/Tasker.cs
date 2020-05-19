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
			// TODO: On task change state pass the task to Notifier and call SendNotification
			foreach (Task task in _tasks){
				PassTaskToNotifier(task);
			}
		}

		private void PassTaskToNotifier(Task task) => new Notifier(task);
		#endregion
	}
}
