using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using WebLab7.Models;


namespace WebLab7.Controllers
{
    public class HomeController : Controller
    {
        INotesRepository notesRepository;

        public HomeController(INotesRepository repos)
        {
            notesRepository = repos;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult SetRow(string name, string json)
        {
            var note = new Note { Name = name, JSONObject = json};
            notesRepository.Add(note);
            return null;
        }

        public string GetRow(string name)
        {
            return notesRepository.Get(name).JSONObject;
        }
        public ActionResult Second() => View();
    }
}
