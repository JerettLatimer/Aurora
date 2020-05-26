using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Hubs
{
    public class GeoHub : Hub 
    {
        public async Task SendMessage()
        {
            await Clients.All.SendAsync("CallMeMaybe");
        }
    }
}
