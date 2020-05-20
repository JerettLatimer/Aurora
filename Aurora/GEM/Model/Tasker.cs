using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Newtonsoft.Json;
using MongoDB.Driver;
using MongoDB.Bson;
using Newtonsoft.Json.Linq;
using System.Timers;
using API;
using API.Models;
using API.Services;
using System.Runtime.InteropServices;
using System.Threading;
using API.Controllers;
using Microsoft.Extensions.DependencyInjection;
using System.Net.Http;
using System.Net;
using Microsoft.CodeAnalysis.CSharp.Syntax;


namespace GEM.Model
{
    public static class Tasker
    {
        #region Properties
        public static List<Task> _tasks = Fetcher._DEMO_TASKS;
        #endregion


        #region Methods



        internal static void Application_Start()
        {
            new Thread(() => StartApiWatch()).Start();
        }

        public static void StartApiWatch()
        {
            string[] prefixes = { "https://aurora-microservices-api.azurewebsites.net/" };
            if (!HttpListener.IsSupported)
            {
                Console.WriteLine("Windows XP SP2 or Server 2003 is required to use the HttpListener class.");
                return;
            }
            if (prefixes == null || prefixes.Length == 0)
                throw new ArgumentException("prefixes");

            HttpListener listener = new HttpListener();
            foreach (string s in prefixes)
            {
                listener.Prefixes.Add(s);
            }

            listener.Start();
            HttpListenerContext context = listener.GetContext();
            HttpListenerRequest request = context.Request;

            //Method call for 3 way swap
            UpdateSurvey();


            listener.Stop();

        }

        private static void UpdateSurvey()
        {
            var task = _tasks.First<Task>();
            task.OutdatedSurvey = task.UpdatedSurvey;
            Fetcher.GetGeodataListAsync();
            task.UpdatedSurvey = Fetcher.Survey;
            PassTaskToNotifier(task);

        }
/*        public static void BuildBody(Task task)
        {
            var OldGeo = task.OutdatedSurvey.GetType();
            var NewGeo = task.UpdatedSurvey.GetType();

            task.MessageBody.Append(string.Format("A Task in the {0} subscription profile has reported a change in one or more of its monitored fields: \n", task.SubscriptionGroup.GroupName));
            foreach (string rule in task.SelectedRules)
            {
                task.MessageBody.Append(string.Format("\t{0}:\n", rule));
                foreach (var newSite in Fetcher.Survey.Sites)
                {
                    var oldSite = task.OutdatedSurvey.Sites.Find(site => site.name == newSite.name);
                    if (!oldSite.GetType().GetProperty(rule).Equals(newSite.GetType().GetProperty(rule)))
                    {
                        task.MessageBody.Append(string.Format("\t\t{0} = \"{1}\" ---> \"{2}\"\n", newSite.name, oldSite.GetType().GetProperty(rule), newSite.GetType().GetProperty(rule)));
                    }
                }
                task.MessageBody.Append(string.Format("\n"));
            }
            PassTaskToNotifier(task);


        }*/


        internal static void PassTaskToNotifier(Task task) => new Notifier(task);
    }
    #endregion
}
