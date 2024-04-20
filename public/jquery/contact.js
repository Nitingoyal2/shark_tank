$(document).ready(function () {
    $("#btnContact").click(function () {
        var name = $("#contactName").val();
        var email = $("#contactEmail").val();
        var mob = $("#contactMobile").val();
        var message = $("#contactTextarea").val();
        var obj = {
            type: "post",
            url: "/db-contact-us",
            data: {
                namee: name,
                emaill: email,
                mobb: mob,
                messagee: message,
            },
        };
        $.ajax(obj)
            .done(function (msg) {
                $("#contactResult").html(msg);
            })
            .fail(function (msgerr) {
                $("#contactResult").html(msgerr);
            });
    });
});