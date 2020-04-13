using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
        // GET: api/Gem
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Gem/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Gem
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Gem/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
