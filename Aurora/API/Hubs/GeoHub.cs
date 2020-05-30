using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Hubs
{
    public class GeoHub : Hub
    {
        protected IHubContext<GeoHub> _context;
        public async Task SendMessage()
        {

            await _context.Clients.All.SendAsync("CallMeMaybe");

        }
    }
}
