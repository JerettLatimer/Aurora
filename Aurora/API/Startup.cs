using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using API.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Mvc.NewtonsoftJson;
using Microsoft.VisualBasic;
using MongoDB.Driver;

namespace API
{
	public class Startup
	{
		public static IServiceCollection service { get; set; }
		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
			Monitor.Application_Start();
		}

		public IConfiguration Configuration { get; }

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{
			services.Configure<DatabaseSettings>(
				Configuration.GetSection(nameof(DatabaseSettings)));

			services.AddSingleton<IDatabaseSettings>(sp =>
				sp.GetRequiredService<IOptions<DatabaseSettings>>().Value);

			service = services.AddSingleton<GemService>();

			services.AddControllers()
				.AddNewtonsoftJson(options => options.UseMemberCasing());
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			if (env.IsDevelopment()) {
				app.UseDeveloperExceptionPage();
			}

			app.UseHttpsRedirection();

			app.UseRouting();

			app.UseAuthorization();

			app.UseEndpoints(endpoints => {
				endpoints.MapControllers();
			});
		}
	}
}
