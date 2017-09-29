using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ymc.Models.Domain
{
     public class AccountRegistrationRetrieval
    {
        public PersonBase Person{ get; set; }        
        public List<int> RoleIds { get; set; }
        public string PasswordHash { get; set; }
    }
}
