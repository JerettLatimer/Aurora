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
using System.Security.Cryptography;

namespace GEM.Model
{
    public static class Tasker
    {
        #region Properties
        public static List<Task> _tasks = Fetcher._DEMO_TASKS;
        #endregion


        #region Methods
        internal static void Application_Start() => new Thread(() => StartApiWatch()).Start();

        // this is were the SignalR SSL socket message should come into...
        public static void StartApiWatch()
        {

            UpdateSurvey();
        }

        private static void UpdateSurvey()
        {
            var task = _tasks.First<Task>();
            task.OutdatedSurvey = task.UpdatedSurvey;
            Fetcher.GetGeodataListAsync();
            task.UpdatedSurvey = Fetcher.Survey;

            PassTaskToNotifier(task);    
        }

        internal static void PassTaskToNotifier(Task task) => new Notifier(task);
    }
    #endregion
}
