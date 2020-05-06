using Microsoft.VisualBasic;
using Microsoft.VisualStudio.Web.CodeGeneration.Utils.Messaging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace GEM.Model
{
	public class Notifier
	{
		public Notifier()
		{

		}
		public static void SendNotification()
		{
			SmtpClient Client = new SmtpClient()
			{
				Host = "smtp.gmail.com",
				Port = 587,
				EnableSsl = true,
				DeliveryMethod = SmtpDeliveryMethod.Network,
				UseDefaultCredentials = false,
				Credentials = new NetworkCredential()
				{
					UserName = "auroragemtool@gmail.com",
					Password = "goxjyzrobdzzwtpj"
				}
			};
			//TODO Create a loop allowing multiple emails to be sent the same message 
			// Note: when adding an email it is actually a collection
			MailAddress FromEmail = new MailAddress("AuroraGemtool@gmail.com", "Aurora GemTool");
			MailAddress ToEmail = new MailAddress("forrestnwallace@gmail.com", "Forrest Wallace");
			//TODO Get Data describing the task that triggered the email
			MailMessage Message = new MailMessage()
			{
				From = FromEmail,
				Subject = "Test Email",
				Body = "Hey all this is a test email from the Gem Tool!",
			};
			Message.To.Add(ToEmail);
			try
			{
				Client.Send(Message);
			}
			catch (Exception e)
			{
				Console.WriteLine("Something went terribly wrong! \n" + e.Message + " Error");
			}
		}
	}
}
