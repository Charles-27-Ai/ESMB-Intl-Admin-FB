using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Web;
using ESMB_Intl_Admin_FB.Models;

namespace ESMB_Intl_Admin_FB.ViewModels
{
    public class LoginViewModel
    {
        public Author Author { get; set; }

        [DisplayName("Remember Me?")]
        public bool Remember { get; set; }
    }
}