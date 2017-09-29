using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ymc.Models.Domain
{
    public class PersonBase
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Photo { get; set; }
        public string PhotoUrl { get; set; }
		public string TextNumber { get; set; }
		public string PhoneNumber { get; set; }
        public SchoolBase School { get; set; }
        public CompanyBase Company { get; set; }
        public List<Role> Roles { get; set; }
	}
}
