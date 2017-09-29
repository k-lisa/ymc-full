using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ymc.Models.Domain
{
    public class UserBase : IUserAuthData
    {
        public int Id
        {
            get;set;
        }

        public string FirstName
        {
            get; set;
        }

        public string LastName { get; set; }

        public string PhotoUrl { get; set; }

        public List<string> Roles
        {
            get; set;
        }
    }
}
