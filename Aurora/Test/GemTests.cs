using API.Controllers;
using API.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Moq;
using API.Services;
using System.Web.Http;
using Microsoft.AspNetCore.Mvc;
using System.Web.Http.Results;

namespace Test
{
    [TestClass]
    public class GemTests
    {
        static HttpClient _client;

        [TestMethod]
        public async Task Get_ReturnsValidGeodataAsync()
        {
            var geodata1 = new Geodata();
            geodata1._id = 
            List<Geodata> temp = new List<Geodata>
            {
                new Geodata().
            };
            var service = new Mock<GemService>().Setup(x => x.Get()).Returns(temp);
            GemController controller = new GemController(new Mock<GemService>().Object);
            ActionResult<List<Geodata>> result = controller.Get();
            List<Geodata> value = result.Value;
            Assert.IsTrue(true);
		}

        public static async Task RunAsync()
        {
            _client = new HttpClient
            {
                BaseAddress = new Uri("https://localhost:44353/")
            };
            _client.DefaultRequestHeaders.Accept.Clear();
            _client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));
        }
    }
}
