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
    public class AnnounceController : Controller
    {
        // GET
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult ViewAll()
        {
            return View(GetAllAnnouncements());
        }

        IEnumerable<TrueAnnouncement> GetAllAnnouncements()
        {
            using (DBModel db = new DBModel())
            {
                return db.TrueAnnouncements.ToList<TrueAnnouncement>();
            }
        }

        public ActionResult AddOrEdit(int id = 0)
        {
            var anno = new TrueAnnouncement();
            if (id != 0)
            {
                using (DBModel db = new DBModel())
                {
                    anno = db.TrueAnnouncements.Where(x => x.AnnoID == id).FirstOrDefault<TrueAnnouncement>();
                }
            }

            return View(anno);
        }

        [HttpPost]

        public ActionResult AddOrEdit(TrueAnnouncement anno)
        {
            try
            {
                if (anno.ImageUpload != null)
                {
                    string fileName = Path.GetFileNameWithoutExtension(anno.ImageUpload.FileName);
                    string extension = Path.GetExtension(anno.ImageUpload.FileName);
                    fileName = fileName + DateTime.Now.ToString("yymmssfff") + extension;  //确保每个图片文件名唯一，避免上传相同文件
                    anno.ImgPath = "~/App_Files/Images/" + fileName;
                    anno.ImageUpload.SaveAs(Path.Combine(Server.MapPath("~/App_Files/Images/"), fileName));
                }

                using (DBModel db = new DBModel())
                {
                    if (anno.AnnoID == 0)
                    {
                        db.TrueAnnouncements.Add(anno);
                        db.SaveChanges(); 
                    }
                    else
                    {
                        db.Entry(anno).State = EntityState.Modified;
                        db.SaveChanges();
                    }

                }

                //return RedirectToAction("ViewAll");
                return Json(new
                {
                    success = true,
                    html = GlobalClass.RenderRazorViewToString(this, "ViewAll", GetAllAnnouncements()),
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

        public ActionResult Delete(int id)
        {
            try
            {
                using (DBModel db = new DBModel())
                {
                    TrueAnnouncement anno = db.TrueAnnouncements.Where(x => x.AnnoID == id).FirstOrDefault<TrueAnnouncement>();
                    db.TrueAnnouncements.Remove(anno);
                    db.SaveChanges();
                }
                return Json(new
                {
                    success = true,
                    html = GlobalClass.RenderRazorViewToString(this, "ViewAll", GetAllAnnouncements()),
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