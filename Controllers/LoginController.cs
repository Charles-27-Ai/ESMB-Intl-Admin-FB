using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ESMB_Intl_Admin_FB.Models;

namespace ESMB_Intl_Admin_FB.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Authorize(ESMB_Intl_Admin_FB.Models.Author userModel)
        {
            using (var db = new TrueDBModel())
            {
                var userDetails = db.Authors.Where(x => x.AuthorCode == userModel.AuthorCode).FirstOrDefault();
                // Incorrect input
                if (userDetails == null)
                {
                    userModel.LoginErrorMessage = "Wrong Admin Code!";
                    return View("Login", userModel);
                }
                // Correct input
                else
                {
                    Session["userID"] = userDetails.AuthorID;
                    Session["userCode"]  = userDetails.AuthorCode;
                    Session["userLevel"] = userDetails.AuthorLevel;
                    Session["userName"]  = userDetails.AuthorFLName;
                    return RedirectToAction("Index", "Announce");
                }
            }
        }

        public ActionResult LogOut()
        {
            //var userCode = Session["userCode"];
            Session.Abandon();
            //return RedirectToAction("Login", "Login");
            return Redirect("/login");
        }
    }
}