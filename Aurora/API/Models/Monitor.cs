﻿using System;
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
using MongoDB.Driver.Core.Events;
using API.Hubs;

/**
 * <see cref="https://devesh4blog.wordpress.com/2018/11/01/real-time-notification-with-mongodb-change-stream-in-c/"/>
 */

namespace API.Models
{
    static class Monitor
    {
        private static GeoHub gimmegimme = new GeoHub();
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
                    await gimmegimme.SendMessage();
                    
                }
            }
        }
    }
}
