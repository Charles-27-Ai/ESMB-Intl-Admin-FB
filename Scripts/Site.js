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
                $("#all").html(response);
                //if (response.success) {
                //    $("#firstTab").html(response.html);
                //    refreshAddNewTab($(form).attr("data-restUrl"), true);
                //    //Success message
                //    $.notify(response.message, "success");
                //    //Call activateJqueryTable func
                //    if (typeof activateJqueryTable !== "undefined" && $.isFunction(activateJqueryTable))
                //        activateJqueryTable();
                //} else {
                //    //Error message
                //    $.notify(response.message, "error");
                //}
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

