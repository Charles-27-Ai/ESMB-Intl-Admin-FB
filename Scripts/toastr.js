/*
Template Name: Monster Admin
Author: Themedesigner
Email: niravjoshi87@gmail.com
File: js
*/
$(function() {
    "use strict";
      $(".info-notification").click(function(){
           $.toast({
            heading: 'Welcome to Monster admin',
            text: 'Use the predefined ones, or specify a custom position object.',
            position: 'top-right',
            loaderBg:'#ff6849',
            icon: 'info',
            hideAfter: 3000, 
            stack: 6
          });

     });

      $(".warning-notification").click(function(){
           $.toast({
            heading: 'Welcome to Monster admin',
            text: 'Use the predefined ones, or specify a custom position object.',
            position: 'top-right',
            loaderBg:'#ff6849',
            icon: 'warning',
            hideAfter: 3500, 
            stack: 6
          });

     });
      $(".success-notification").click(function(){
           $.toast({
            heading: 'Your announcement has been saved',
            text: 'It should appear at the top of the ViewAll table.',
            position: 'top-right',
            loaderBg:'#ff6849',
            icon: 'success',
            hideAfter: 3500, 
            stack: 6
          });

     });

      $(".error-notification").click(function(){
           $.toast({
            heading: 'Welcome to Monster admin',
            text: 'Use the predefined ones, or specify a custom position object.',
            position: 'top-right',
            loaderBg:'#ff6849',
            icon: 'error',
            hideAfter: 3500
            
          });

     });
});
          
