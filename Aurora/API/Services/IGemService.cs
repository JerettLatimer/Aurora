using API.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Services
{
    public interface IGemService
    {
        Task<List<Geodata>> Get();
        Task<Geodata> Get(string filterByName);
    }
}