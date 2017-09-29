using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace Ymc.Web
{
    public class ChatHub : Hub
    {
        public void Send(string name, string message, string photo)
        {
            // Call the broadcastMessage method to update clients.
            //Clients.All.broadcastMessage(name, message);
            Clients.All.addNewMessageToPage(name, message, photo);
        }
    }
}