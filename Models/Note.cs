using System;
using System.ComponentModel.DataAnnotations;

namespace WebLab7.Models
{
    public class Note
    {
        [Key]
        public string Name { get; set; }
        public string JSONObject { get; set; }
    }
}
