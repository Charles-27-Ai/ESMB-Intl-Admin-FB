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
        public ActionResult Authorize(Author userModel)
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
                Session["userID"] = userDetails.AuthorID;
                Session["userCode"]  = userDetails.AuthorCode;
                Session["userLevel"] = userDetails.AuthorLevel;
                Session["userName"]  = userDetails.AuthorFLName;

                if (userDetails.Remember)
                {
                    Response.Cookies["userCode"].Value = userDetails.AuthorCode;
                    Response.Cookies["userCode"].Expires = DateTime.Now.AddMinutes(1);
                }
                else
                {
                    Response.Cookies["userCode"].Expires = DateTime.Now.AddMinutes(-1);

                }
                return RedirectToAction("Index", "Announce");
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