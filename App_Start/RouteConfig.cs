using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace ESMB_Intl_Admin_FB
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            
            routes.MapRoute(
                "Announce",
                "Announce",
                new { Controller = "Announce", Action = "Index"}
            );

            routes.MapRoute(
                "Author",
                "Author",
                new { Controller = "Author", Action = "Author"}
            );

            routes.MapRoute(
                "Login",
                "Login",
                new { Controller = "Login", Action = "Login"}
            );

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Login", action = "Login", id = UrlParameter.Optional }
            );
        }
    }
}
