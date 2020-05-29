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
        private static IMongoCollection<Geodata> collection;
        #endregion


        #region Methods
        internal static void Application_Start() => new Thread(() => WatchForChanges()).Start();

        public static void WatchForChanges()
        {
            var pipeline = new EmptyPipelineDefinition<Geodata>().Match("{ operationType: { $eq: 'update' } }");
            var client = new MongoClient("mongodb+srv://Fetcher:nvZUzMHPqnpX50kj@aurora-pjpea.azure.mongodb.net/test?retryWrites=true&w=majority");
            var database = client.GetDatabase("GEM");
            collection = database.GetCollection<Geodata>("Geodata");

            using (var cursor = collection.Watch())
            {
                foreach (var change in cursor.ToEnumerable())
                {
                    UpdateSurvey();
                }
            }

        }

        private static async void UpdateSurvey()
        {
            var task = _tasks.First();
            
            task.OutdatedSurvey = (Site)task.UpdatedSurvey.Clone();
            Fetcher.Survey.Sites = await Fetcher.GetGeodataListAsync();
            task.UpdatedSurvey = Fetcher.Survey;
            PassTaskToNotifier(task);

        }

        internal static void PassTaskToNotifier(Task task) => new Notifier(task);
    }
    #endregion
}
