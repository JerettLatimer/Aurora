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
		public bool flag = false;
		#endregion

		#region Properties
		public IConfiguration Configuration { get; }
		#endregion

		#region Constructor
		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;

			
			InitialGeodataFetch();

			/* DEMO START */
			StartDemo();
			/**/
		}
		#endregion


		#region Methods

		private async void InitialGeodataFetch()
		{
			Fetcher.Survey.Sites = await Fetcher.GetGeodataListAsync();
		}

		/* DEMO TEMPLATE METHOD */
		private void StartDemo()
		{
			Fetcher.DEMO_CREATEMOCKOBJECTS();
			Tasker.Application_Start();
		}
		/**/


		#region Configuation
		public void ConfigureServices(IServiceCollection services) => services.AddRazorPages();

		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			if (env.IsDevelopment()) {
				app.UseDeveloperExceptionPage();
			}
			else {
				app.UseExceptionHandler("/Error");
				app.UseHsts();
			}

			app.UseHttpsRedirection();
			app.UseStaticFiles();
			app.UseRouting();
			app.UseAuthorization();
			app.UseEndpoints(endpoints => {	endpoints.MapRazorPages(); });
		}
		#endregion

		#endregion
	}
}
