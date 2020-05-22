﻿using System;
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
        internal static void Application_Start() => new Thread(() => StartApiWatch()).Start();

        public static void StartApiWatch()
        {
            string[] prefixes = { "https://localhost:25/" };
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
            IAsyncResult result = listener.BeginGetContext(new AsyncCallback(ListenerCallback),listener);
            Console.WriteLine("Waiting for request to be processed asyncronously.");
            result.AsyncWaitHandle.WaitOne();
            Console.WriteLine("Request processed asyncronously.");
            listener.Close();
        }

        private static void ListenerCallback(IAsyncResult result)
        {
            HttpListener listener = (HttpListener) result.AsyncState;
            HttpListenerContext context = listener.EndGetContext(result);
            HttpListenerRequest request = context.Request;
            HttpListenerResponse response = context.Response;
            string responseString = "<HTML><BODY> Hello world!</BODY></HTML>";
            byte[] buffer = System.Text.Encoding.UTF8.GetBytes(responseString);
            response.ContentLength64 = buffer.Length;
            System.IO.Stream output = response.OutputStream;
            output.Write(buffer, 0, buffer.Length);
            output.Close();
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
