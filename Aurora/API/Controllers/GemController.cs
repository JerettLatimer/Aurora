﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GEM.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers
{
    // TODO: Can we change name of this class and have three other classes similar to what we did in Services/GemService.cs
    // TODO: Check SecretSanta project and see how it's WEB project got data from the API project
    [Route("api/[controller]")]
    [ApiController]
    public class GemController : ControllerBase
    {
        private readonly GeodataService _geodataService;

        public GemController(GeodataService geodataService)
        {
            _geodataService = geodataService;
        }

        // GET: api/Gem
        [HttpGet]
        public ActionResult<List<Geodata>> Get() =>
            _geodataService.Get();

        // GET: api/Gem/5
        [HttpGet("{id}", Name = "Get")]
        public ActionResult<Geodata> Get(string id)
        {
            Geodata geodata = _geodataService.Get(id);

            if (geodata == null)
            {
                return NotFound();
            }

            return geodata;
        }

        // POST: api/Gem
        [HttpPost]
        public ActionResult<Geodata> Post(Geodata geodata)
        {
            _geodataService.Create(geodata);

            return CreatedAtRoute("GetBook", new { id = geodata._id.ToString() }, geodata);
        }

        // PUT: api/Gem/5
        [HttpPut("{id}")]
        public IActionResult Put(string id, Geodata geodataIn)
        {
            Geodata geodata = _geodataService.Get(id);

            if (geodata == null)
            {
                return NotFound();
            }

            _geodataService.Update(id, geodataIn);

            return NoContent();
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var geodata = _geodataService.Get(id);

            if (geodata == null)
            {
                return NotFound();
            }

            _geodataService.Remove(geodata._id.ToString());

            return NoContent();
        }
    }
}