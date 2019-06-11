// Notification
//function successNote() {
//    $.toast({
//        heading: "Your announcement has been saved",
//        text: "It should appear at the top of the ViewAll table.",
//        position: "top-right",
//        loaderBg:"#ff6849",
//        icon: "success",
//        hideAfter: 3500, 
//        stack: 6
//    });
//}


// Ajax form validation and Post request
function jQueryAjaxPost(form) {  // reach to AnnounceController 里的 HttpPost 下的 method
    $.validator.unobtrusive.parse(form);
    if ($(form).valid()) {
        //$.ajax();
        var ajaxConfig = {
            type: "POST",
            url: form.action,
            data: new FormData(form),
            success: function(response) {
                //$("#allViewTab").html(response);
                //refreshAddNewTab($(form).attr("data-restUrl"), true);
                
                if (response.success) {
                    $("#allViewTab").html(response.html);
                    refreshAddNewTab($(form).attr("data-restUrl"), true);
                    //Success message
                    $.notify(response.message, "success");
                    //Call activateJqueryTable func
                    if (typeof activateJqueryTable !== "undefined" && $.isFunction(activateJqueryTable))
                        activateJqueryTable();
                } else {
                    //Error message
                    $.notify(response.message, "error");
                }
            }
        }
        if ($(form).attr("enctype") == "multipart/form-data") {
            ajaxConfig["contentType"] = false;
            ajaxConfig["processData"] = false;
        }
        $.ajax(ajaxConfig);
    }

    return false;
}


function refreshAddNewTab(resetUrl, showViewTab) {
    $.ajax({
        type: "GET",
        url: resetUrl,
        success: function(response) {
            $("#newAnnoTab").html(response);
            $("ul.nav.nav-tabs a:eq(1)").html("Add New");
            if (showViewTab) {
                window.location.reload();
                window.onload = function() {
                    $("ul.nav.nav-tabs a:eq(0)").tab("show");
                    
                }
            }

        }
    });
}
