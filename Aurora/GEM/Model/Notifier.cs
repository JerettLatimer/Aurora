using Aurora.Pages;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Net.Mime;
using System.Text;

namespace GEM.Model
{
	public class Notifier
	{
		#region Properties
		private readonly Task _task;
		private readonly Attachment _logo = new Attachment(@"wwwroot/logo.png");
		private readonly string _bodyStyle = "style=\"font-family: 'Segoe UI'; font-weight: 300; color: #848484;\"";
		#endregion

		#region Constructor
		public Notifier(Task task)
		{
			_task = task;
			BuildBody();
		}
		#endregion


		#region Methods
		public void BuildBody()
		{
			var message = new StringBuilder();
			message.Append(string.Format("<span {0}>Task \"{1}\" in the {2} subscription profile has reported a change in one or more of its monitored fields: \n\n", _bodyStyle, _task.TaskName, _task.SubscriptionGroup.GroupName));
			
			var hasChanges = false;
			foreach (var newSite in _task.UpdatedSurvey.Sites)
			{
				
				var oldSite = _task.OutdatedSurvey.Sites.Find(site => site.name == newSite.name);
				foreach (string rule in _task.SelectedRules)
				{
					// TODO: Bug: Handle Edge Case for Location object, needs to compare against it's Coordinates properties

					var outdatedData = oldSite.GetType().GetProperty(rule).GetValue(oldSite, null);
					var updatedData = newSite.GetType().GetProperty(rule).GetValue(newSite, null);
					

					if (!outdatedData.Equals(updatedData))
					{
						message.Append(string.Format("<div><h3>Site {0}:</h3>", newSite.name));
						message.Append(string.Format("<p>Field {0} changed from \"{1}\" to \"{2}\"</p>", rule, outdatedData, updatedData));
						message.Append(string.Format("</div>"));
						hasChanges = true;
					}
				}
				
			}
			message.Append(string.Format("</span>"));

			if (hasChanges)
			{
				_task.MessageBody = message;
				SendNotification();
			}
		}

		private void SendNotification()
		{
			// TODO: this data will need to be abstracted out to a seperate file like out DatabaseSettings class int he API that uses the appsettings.json
			var Client = new SmtpClient() {
				Host = "smtp.gmail.com",
				Port = 587,
				EnableSsl = true,
				DeliveryMethod = SmtpDeliveryMethod.Network,
				UseDefaultCredentials = false,
				Credentials = new NetworkCredential() {
					UserName = "auroragemtool@gmail.com",
					Password = "goxjyzrobdzzwtpj"
				}
			};

			var Message = new MailMessage() {
				From = new MailAddress("AuroraGemtool@gmail.com", "Aurora: GEM tool"),
				Subject = "GEM: Alert Notification",
				Body = _task.MessageBody.ToString(),
				IsBodyHtml = true,
			};

			Message.Attachments.Add(_logo);
			_logo.ContentId = _logo.GetHashCode().ToString();
			Message.Body = string.Format("<h1><img src =\"cid:{0}\"height=34/> Geodata Event Notification</h1>{1}", _logo.ContentId, Message.Body);

			foreach (Subscriber user in _task.SubscriptionGroup.Subscribers) {
				Message.Bcc.Add(new MailAddress(user.UserEmail, user.UserName));
			}

			try	{
				Client.Send(Message);
			}
			catch (Exception e)	{
				Console.WriteLine("Something went terribly wrong! \n" + e.Message + " Error");
			}
		}
		#endregion
	}
}
