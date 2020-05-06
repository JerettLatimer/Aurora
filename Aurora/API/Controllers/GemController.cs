using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using API.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace API.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class GemController : ControllerBase
	{
		#region Header
		private readonly GemService _gemService;

		public GemController(GemService gemService)
		{
			_gemService = gemService;
		}
		#endregion


		#region API Calls
		// GET: api/Gem
		[HttpGet]
		public ActionResult<List<Geodata>> Get() 
		{
			var result = _gemService.Get().Result;
			return result;
		}

		// GET: api/Gem/cgr3
		[HttpGet("{name}", Name = "Get")]
		public ActionResult<Geodata> Get(string name)
		{
			Geodata geodata = _gemService.Get(name).Result;
			return (geodata != null) ? (ActionResult<Geodata>)geodata : NotFound();
		}


		//// POST: api/Gem
		//[HttpPost]
		//public ActionResult<Geodata> Post(Geodata geodata)
		//{
		//    _gemService.Create(geodata);

		//    return CreatedAtRoute("GetBook", new { id = geodata._id.ToString() }, geodata);
		//}

		//// PUT: api/Gem/5
		//[HttpPut("{id}")]
		//public IActionResult Put(string id, Geodata geodataIn)
		//{
		//    Geodata geodata = _gemService.Get(id);

		//    if (geodata == null)
		//    {
		//        return NotFound();
		//    }

		//    _gemService.Update(id, geodataIn);

		//    return NoContent();
		//}

		//// DELETE: api/ApiWithActions/5
		//[HttpDelete("{id}")]
		//public IActionResult Delete(string id)
		//{
		//    var geodata = _gemService.Get(id);

		//    if (geodata == null)
		//    {
		//        return NotFound();
		//    }

		//    _gemService.Remove(geodata._id.ToString());

		//    return NoContent();
		//}
		#endregion
	}
}
