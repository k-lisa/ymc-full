using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ymc.Models.Requests
{
    public class LanguageUpdateRequest: LanguageAddRequest
    {
        [Required]
        public int Id { get; set; }
    }
}
