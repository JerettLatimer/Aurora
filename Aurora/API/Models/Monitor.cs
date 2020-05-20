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
                    using(var client = new HttpClient())
                    {
                        //BaseAddress = new Uri("https://aurora-microservices-gem.azurewebsites.net/")
                        var values = new Dictionary<string, string>
                        {
                            { "thing1", "New" },
                            { "thing2", "Data" }
                        };
                        var content = new FormUrlEncodedContent(values);
                        var response = await client.PostAsync("https://localhost:5001/", content); //when running API solo this is where it pings the active refusal after change in db is made
                        var responseString = await response.Content.ReadAsStringAsync();
                    }
                }
            }
        }
    }
}
