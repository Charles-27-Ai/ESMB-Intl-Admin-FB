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
                
                if (response.success) {
                    $("#allViewTab").html(response.html);
                    window.location.reload(); // Reload page to load CSS
                    refreshAddNewTab($(form).attr("data-restUrl"), true);
                    //Success message
                    //$.notify(response.message, "success");
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

// Submit Author Form
function jQueryAjaxPostAuthor(form) {  // reach to AnnounceController 里的 HttpPost 下的 method
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
                    $("#allAuthorTab").html(response.html);
                    refreshAddNewAuthorTab($(form).attr("data-restUrl"), true);
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

// Refresh Anno Tab
function refreshAddNewTab(resetUrl, showViewTab) {
    $.ajax({
        type: "GET",
        url: resetUrl,
        success: function(response) {
            $("#newAnnoTab").html(response);
            $("ul.nav.nav-tabs a:eq(1)").html("Add New");
            if (showViewTab) {
                //window.location.reload();
                $("ul.nav.nav-tabs a:eq(0)").tab("show");

            }
        }
    });
}

// Refresh Author Tab
function refreshAddNewAuthorTab(resetUrl, showViewTab) {
    $.ajax({
        type: "GET",
        url: resetUrl,
        success: function(response) {
            $("#newAuthorTab").html(response);
            $("ul.nav.nav-tabs a:eq(1)").html("Add New Admin");
            if (showViewTab) {
                //window.location.reload();
                $("ul.nav.nav-tabs a:eq(0)").tab("show");
            }
        }
    });
}

// Edit Anno in Table
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

// Edit Author in Table
function EditAuthor(url) {
    $.ajax({
        type: "GET",
        url: url,
        success: function(response) {
            $("#newAuthorTab").html(response);
            $("ul.nav.nav-tabs a:eq(1)").html("Edit Admin");  // Change the name of tab
            $("ul.nav.nav-tabs a:eq(1)").tab("show");
        }
    });
}

// Delete Anno from Table
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

// Delete Author from Table
function DeleteAuthor(url) {
    swal({
            title: "Are you sure to delete?",
            text: "You will not be able to recover this Author",
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
                            $("#allAuthorTab").html(response.html);
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









