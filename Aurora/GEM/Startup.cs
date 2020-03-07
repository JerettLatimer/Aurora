using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
		#region Properties
		public IConfiguration Configuration { get; }
		internal Fetcher Data { get; set; }
		#endregion

		#region Constructor
		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;


			// TODO: not sure if best place to put Fetcher, maybe Pages/Index.cshtml.cs via OnGet() method?
			// ultimatly, ensure that the Fetcher singleton instance can be accessed anywhere with only one creation!
			Data = Fetcher.Instance;
			Data.SetInterval(10);
			Data.Start();



			/* REMOVE THIS BEFORE MERGE INTO STAGE */
			////////// Unit Testing
						// Calling on Json string list, deserialize string into Geodata and finding properties though Geodata Object
						var jsonGeodataList = new List<Sites>();


						// Calling on Geodata object list and finding properties through Geodata Object 
						var test_for_geodata = Data.GeodataRouters;
						var ListOfAllSites = test_for_geodata.sites;
						var expectingCoordinates_byIndexOfObject = test_for_geodata["cgr1"].location.coordinates.latitude;
		}
		#endregion

		#region Methods
		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{
			services.AddRazorPages();
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}
			else
			{
				app.UseExceptionHandler("/Error");
				// The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
				app.UseHsts();
			}

			app.UseHttpsRedirection();
			app.UseStaticFiles();

			app.UseRouting();

			app.UseAuthorization();

			app.UseEndpoints(endpoints =>
			{
				endpoints.MapRazorPages();
			});
		}
		#endregion
	}
}
