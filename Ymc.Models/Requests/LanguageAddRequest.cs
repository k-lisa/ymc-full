using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ymc.Models.Requests
{
    public class LanguageAddRequest
    {
        [Required]
        [StringLength(20)]
        public string Code { get; set; }

        [Required]
        [StringLength(50)]
        public string Name { get; set; }
        [Required]
        public int DisplayOrder { get; set; }

        public bool Inactive { get; set; }
    }
}
