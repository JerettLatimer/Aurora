using GEM.Model;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Task = System.Threading.Tasks.Task;

namespace Test
{
	[TestClass]
	public class GemTests
	{
		static HttpClient _client;

		[TestMethod]
		public async Task Get_HttpClientRequest_ReturnsSuccessCode()
		{
			// Arrange

			// Act
			HttpResponseMessage response = await _client.GetAsync("api/Gem");

			// Assert
			Assert.IsTrue(response.IsSuccessStatusCode);
		}

		[TestMethod]
		public async Task Get_HttpClientRequest_ReturnsListOfGeodata()
		{
			// Arrange

			// Act
			HttpResponseMessage response = await _client.GetAsync("api/Gem");
			var result = await response.Content.ReadAsAsync<List<Geodata>>();

			// Assert
			Assert.IsNotNull(result);
			Assert.IsInstanceOfType(result, typeof(List<Geodata>));
		}

		[TestMethod]
		public async Task Get_HttpClientRequest_ReturnsCoordinatesAsObject()
		{
			// Arrange

			// Act
			HttpResponseMessage response = await _client.GetAsync("api/Gem");
			var result = await response.Content.ReadAsAsync<List<Geodata>>();
			var testObject = result[1];

			// Assert
			Assert.IsNotNull(testObject);
			Assert.IsNotNull(testObject.location.coordinates.latitude);
			Assert.IsNotNull(testObject.location.coordinates.longitude);
			Assert.IsInstanceOfType(testObject.location.coordinates, typeof(Coordinates));
		}

		[TestMethod]
		public async Task GetByName_HttpClientRequest_ReturnsValidGeodataObject()
		{
			// Arrange

			// Act
			HttpResponseMessage response = await _client.GetAsync("api/Gem/cgr1");
			var result = await response.Content.ReadAsAsync<Geodata>();

			// Assert
			Assert.IsNotNull(result.id);
			Assert.IsNotNull(result.name);
			Assert.IsNotNull(result.status);
			Assert.IsNotNull(result.location.coordinates.latitude);
			Assert.IsNotNull(result.location.coordinates.longitude);
			Assert.IsNotNull(result.lastModified);
			Assert.IsNotNull(result.minutesOffline);
			Assert.IsInstanceOfType(result, typeof(Geodata));
		}

		[TestInitialize]
		public void Setup()
		{
			_client = new HttpClient
			{
				//BaseAddress = new Uri("https://localhost:44353/")
				BaseAddress = new Uri("https://aurora-microservices-api.azurewebsites.net/")
			};
			_client.DefaultRequestHeaders.Accept.Clear();
			_client.DefaultRequestHeaders.Accept.Add(
				new MediaTypeWithQualityHeaderValue("application/json"));
		}

		[TestCleanup]
		public void Cleanup()
		{
			_client.Dispose();
		}
	}
}
