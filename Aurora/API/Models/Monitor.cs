using System;
using System.Collections.Generic;
using System.Linq;
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
using System.Net.Http.Headers;

/**
 * <see cref="https://devesh4blog.wordpress.com/2018/11/01/real-time-notification-with-mongodb-change-stream-in-c/"/>
 */

namespace API.Models
{
    static class Monitor
    {
        private static IMongoCollection<Geodata> collection;
        internal static void Application_Start()
        {
            CollectionConnection();
            new Thread(() => StartCollectionWatch()).Start();
        }

        private static void CollectionConnection()
        {            // We are just watching update operation
            var pipeline = new EmptyPipelineDefinition<Geodata>().Match("{ operationType: { $eq: 'update' } }");
            var client = new MongoClient("mongodb+srv://Fetcher:nvZUzMHPqnpX50kj@aurora-pjpea.azure.mongodb.net/test?retryWrites=true&w=majority");
            var database = client.GetDatabase("GEM");
            collection = database.GetCollection<Geodata>("Geodata");
        }
        public static async void StartCollectionWatch()
        {

            // start the watch on the collection
            using (var cursor =  collection.Watch())
            {
                 foreach(var change in cursor.ToEnumerable()) 
                {
                    using(var client = new HttpClient()) // ref: https://aspnetmonsters.com/2016/08/2016-08-27-httpclientwrong/
                    {
                        client.DefaultRequestHeaders.Accept.Clear();
                        var values = new Dictionary<string, string>
                        {
                            { "thing1", "New" },
                            { "thing2", "Data" }
                        };
                        var content = new FormUrlEncodedContent(values);
                        var response = await client.GetAsync(new Uri("https://localhost:5001"));
                    }
                }
            }
        }
    }
}
