using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Mvc;
using ESMB_Intl_Admin_FB.Models;

namespace ESMB_Intl_Admin_FB.Controllers
{
    public class AuthorController : Controller
    {
        // GET: Author
        public ActionResult Author()
        {
            return View();
        }

        public ActionResult ViewAllAuthors()
        {
            return View(GetAllAuthors());
        }

        IEnumerable<Author> GetAllAuthors()
        {
            using (var db = new TrueDBModel())
            {
                return db.Authors.Include(a => a.TrueAnnouncements).ToList();
            }
        }

        public ActionResult AddorEditAuthors(int id = 0)
        {
            var author = new Author();
            if (id != 0)
            {
                using (var db = new TrueDBModel())
                {
                    author = db.Authors.Where(i => i.AuthorID == id).FirstOrDefault<Author>();
                }
            }
            return View(author);
        }

        [HttpPost]
        public ActionResult AddorEditAuthors(Author author)
        {
            return RedirectToAction("ViewAllAuthors");
        }
    }
}