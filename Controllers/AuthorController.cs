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
            try
            {
                using (var db = new TrueDBModel())
                {
                    if (author.AuthorID == 0)
                    {
                        db.Authors.Add(author);
                        db.SaveChanges();
                    }
                    else
                    {
                        db.Entry(author).State = EntityState.Modified;
                        db.SaveChanges();
                    }
                }

                //return RedirectToAction("ViewAllAuthors");
                return Json(new
                {
                    success = true,
                    html = GlobalClass.RenderRazorViewToString(this, "ViewAllAuthors", GetAllAuthors()),
                    message = "Submitted Successfully"
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new
                {
                    success = false,
                    message = ex.Message
                }, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult DeleteAuthor(int id)
        {
            try
            {
                using (var db = new TrueDBModel())
                {
                    var author = db.Authors.Where(x => x.AuthorID == id).FirstOrDefault<Author>();
                    db.Authors.Remove(author);
                    db.SaveChanges();
                }

                return Json(new
                {
                    success = true,
                    html = GlobalClass.RenderRazorViewToString(this, "ViewAllAuthors", GetAllAuthors()),
                    message = "Delete Successfully"
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new
                {
                    success = false,
                    message = ex.Message
                }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}