using Aurora.Pages;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Net.Mime;

namespace GEM.Model
{
	public class Notifier
	{
		#region Properties
		private readonly Task _task;
		private readonly Attachment _logo = new Attachment(@"wwwroot/logo.png");
		private readonly string _headerStyle = "style=\"background-color: white; z-index: 99;\"";
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
			var OldGeo = _task.OutdatedSurvey.GetType();
			var NewGeo = _task.UpdatedSurvey.GetType();

			_task.MessageBody.Append(string.Format("<span {0}>You are receiving this email because a task in the {1} subscription profile has reported a change in one or more of its monitored fields: \n", _bodyStyle, _task.SubscriptionGroup.GroupName));
			foreach (string rule in _task.SelectedRules)
			{
				_task.MessageBody.Append(string.Format("\t{0}:\n", rule));
				foreach (var newSite in Fetcher.Survey.Sites)
				{
					var oldSite = _task.OutdatedSurvey.Sites.Find(site => site.name == newSite.name);
					if (!oldSite.GetType().GetProperty(rule).Equals(newSite.GetType().GetProperty(rule)))
					{
						_task.MessageBody.Append(string.Format("\t\t{0} changed from \"{1}\" to \"{2}\"\n", newSite.name, oldSite.GetType().GetProperty(rule), newSite.GetType().GetProperty(rule)));
					}
				}
				_task.MessageBody.Append(string.Format("\n"));
			}
			_task.MessageBody.Append(string.Format("</span>"));
		}

		public void SendNotification()
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
			Message.Body = string.Format("<h1 {0}><img src =\"cid:{1}\"height=34/> Geodata Event Notification</h1>{2}", _headerStyle, _attachment.ContentId, Message.Body);

			foreach (Subscriber user in _task.SubscriptionGroup.Subscribers) {
				Message.To.Add(new MailAddress(user.UserEmail, user.UserName));
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
