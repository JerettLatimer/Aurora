using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GEM;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using GEM.Model;
using MongoDB.Bson;
using MongoDB.Driver;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;


namespace Aurora
{
	public class Startup
	{
		#region Fields
		#endregion

		#region Properties
		public IConfiguration Configuration { get; }
		#endregion

		#region Constructor
		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;

			/* DEMO START */
			LaunchMockScenario();
			/**/
		}
		#endregion


		#region Methods
		/* DEMO TEMPLATE METHOD */
		private void LaunchMockScenario()
		{
			// TODO: steps to create 3 Subscription Profiles (Manager, Technician, Analyst), 1 Task (DemoTask), 1 Fetcher at startup so that Fetcher

			// 1: Start initial pull of Geodata from MongoDB (Mocks the event that API will trigger to make a 'Get' to API)
			Fetcher.GetGeodataListAsync();
			// 2: Create Mock Subscriptions and Task data (Mocks the reading of all Subscriptions in collection and all Tasks in collection)
			Fetcher.DEMO_CREATEMOCKOBJECTS();
			// 3: Call WatchApi
			Tasker.Application_Start();
		}
		/**/


		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services) => services.AddRazorPages();

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			if (env.IsDevelopment()) {
				app.UseDeveloperExceptionPage();
			}
			else {
				app.UseExceptionHandler("/Error");
				// The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
				app.UseHsts();
			}

			app.UseHttpsRedirection();
			app.UseStaticFiles();
			app.UseRouting();
			app.UseAuthorization();
			app.UseEndpoints(endpoints => {	endpoints.MapRazorPages(); });
		}
		#endregion

	}
}
