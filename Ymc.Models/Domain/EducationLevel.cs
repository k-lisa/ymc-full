using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ymc.Models.Domain
{
    public class EducationLevel
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string LevelOfEducation { get; set; }
        public int DisplayOrder { get; set; }
        public bool Inactive { get; set; }
    }
}
