﻿using System;
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
            TrueAnnouncement anno = new TrueAnnouncement();
            //if (id != 0)
            //{
            //    using (DBModel db = new DBModel())
            //    {
            //        anno = db.TrueAnnouncements.Where(x => x.AnnoID == id).FirstOrDefault<TrueAnnouncement>();
            //    }
            //}

            return View(anno);
        }

        [HttpPost]

        public ActionResult AddOrEdit()
        {
            return View();
        }
    }
}