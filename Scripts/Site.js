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
                //$("ul.nav.nav-tabs a:eq(0)").tab("show");
                window.location.reload();
                $("ul.nav.nav-tabs a:eq(0)").tab("show");

                //window.onload = function () {
                //    $("ul.nav.nav-tabs a:eq(0)").tab("show");

                //}
            }
        }
    });
}


//function turnEditToAddTab(resetUrl) {
//    $.ajax({
//        type: "GET",
//        url: resetUrl,
//        success: function(response) {
//            $("#newAnnoTab").html(response);
//            $("ul.nav.nav-tabs a:eq(1)").html("Add New");
//            $("ul.nav.nav-tabs a:eq(1)").tab("show");

//        }
//    });
//}

function Edit(url) {
    $.ajax({
        type: "GET",
        url: url,
        success: function(response) {
            $("#newAnnoTab").html(response);
            $("ul.nav.nav-tabs a:eq(1)").html("Edit");  // Change the name of tab
            $("ul.nav.nav-tabs a:eq(1)").tab("show");
        }
    });
}

function Delete(url) {
    swal({
            title: "Are you sure to delete?",
            text: "You will not be able to recover this announcement    ",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false
    },
    function() {
        $.ajax({
            type: "POST",
            url: url,
            success: function(response) {
                if (response.success) {
                    window.location.reload();
                    window.onload = function() {
                        $("#allViewTab").html(response.html);
                    }
                    //$.notify(response.message, "warn");
                    //这里我实在是不懂如何在 确定后再执行这些 ajax 语句
                    if (typeof activateJqueryTable !== "undefined" && $.isFunction(activateJqueryTable))
                        activateJqueryTable();
                } else {
                    $.notify(response.message, "error");
                }
            }
        });

    });
}

function Publish() {
    swal({
            title: "Are you sure to publish?",
            text: "You will not be able to recover this announcement    ",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, publish it!",
            closeOnConfirm: false
        },
        function() {
            swal("Published!", "Your announcement can be viewed by everyone!", "success");

        });
}









