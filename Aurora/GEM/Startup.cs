using API.Hubs;
using GEM.Model;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SignalR.Client;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;

namespace Aurora
{
    public class Startup
	{
		#region Fields
		public HubConnection connection;
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

			connection = new HubConnectionBuilder()
				.WithUrl("https://localhost:5010/GeoHub").Build();

			CatchApiSignal();
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
			//Tasker.Application_Start();
		}
		/**/

		private async void CatchApiSignal()
        {
			connection.On("CallMeMaybe", () => 
			{
				Tasker.UpdateSurvey();
			});
            try
            {
				await connection.StartAsync();
            }
			catch (Exception ex)
            {
				Console.WriteLine("YOU DIDDLY DONE MESSED UP");
            }
        }

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{
			services.AddRazorPages();
			services.AddSignalR();
		}
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
			app.UseEndpoints(endpoints => {	endpoints.MapRazorPages();
				endpoints.MapHub<GeoHub>("/GeoHub");
			});
		}
		#endregion

	}
}
