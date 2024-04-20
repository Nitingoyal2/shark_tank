$(document).ready(function () {
  //  eye
  $(".fa").mouseenter(function () {
    $(".pswd").prop("type", "text");
    $(".fa").removeClass("fa-eye").addClass("fa-eye-slash");
  });

  $(".fa").mouseleave(function () {
    $(".pswd").attr("type", "password");
    $(".fa").removeClass("fa-eye-slash").addClass("fa-eye");
  });
  //------------------------------------------------------------------------------------
  //  validations
  $(".txtEmailLog").blur(function () {
    var exp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    var email = $(".txtEmailLog").val();

    if (exp.test(email) == true) {
      $(this).css("border", "2px solid green");
    } else {
      $(this).css("border", "2px solid red");
    }
  });

  $(".txtPswdLog").blur(function () {
    var pass = $(".txtPswdLog").val();
    var r =/(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    if (r.test(pass) == true) {
      $(this).css("border", "2px solid green");
    } else {
      $(this).css("border", "2px solid red");
    }
  });

  $(".txtEmailSign").blur(function () {
    var exp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    var email = $(".txtEmailSign").val();

    if (exp.test(email) == true) {
      $(this).css("border", "2px solid green");
    } else {
      $(this).css("border", "2px solid red");
    }
  });

  $(".txtPswdSign").blur(function () {
    var pass = $(".txtPswdSign").val();
    var r =/(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    if (r.test(pass) == true) {
      $(this).css("border", "2px solid green");
    } else {
      $(this).css("border", "2px solid red");
    }
  });

  $(".txtMobSign").blur(function () {
    var pass = $(".txtMobSign").val();
    var r = /^[6-9]{1}[0-9]{9}$/;
    if (r.test(pass) == true) {
      $(this).css("border", "2px solid #green");
    } else {
      $(this).css("border", "2px solid red");
    }
  });

  $(".txtSel").blur(function () {
    var sel = $(".txtSel").val();
    if (sel == "select") {
      $(this).css("border", "2px solid red");
    } else {
      $(this).css("border", "2px solid #green");
    }
  });
  //--------------------------------------------------------------------------------------------
  // ajax
  $("#txtEmail").blur(function () {
    var myEmail = $("#txtEmail").val();
    var obj = {
      type: "get",
      url: "/ajax-chk-user",
      data: {
        emaill: myEmail,
      },
    };
    $.ajax(obj)
      .done(function (myResponse) {
        $("#inputRes").html(myResponse);
      })
      .fail(function (err) {
        alert(err.toString());
      });
  });

  ///--------------------

  //-------------------------------------------------------------
  //signup
  $("#btnSignup").click(function () {
    var email = $("#txtEmail").val();
    var pswd = $("#txtPswd").val();
    var Type = "";
    if ($("#txtShark").prop("selected") == true) {
      Type = "Shark";
    } else if ($("#txtPitch").prop("selected") == true) {
      Type = "Pitcher";
    }
    var obj = {
      type: "post",
      url: "/db-Signup",
      data: {
        emaill: email,
        pswdd: pswd,
        typee: Type,
      },
    };
    $.ajax(obj)
      .done(function (msg) {
        $("#submitRes").html(msg);
      })
      .fail(function (msgerr) {
        $("#submitRes").html(msgerr);
      });
  });

  // $(document).ajaxStart(function () {
  //   $("#submitRes").css("display", "block");
  // })
  // $(document).ajaxStop(function () {
  //   $("#submitRes").css("display", "none");
  // })
  //------------------------------------------------------------------------------------
  $("#btnLogin").click(function () {
    var myLoginEmail = $("#inputEmail").val();
    var myLoginPass = $("#inputPassword").val();
    var obj = {
      type: "post",
      url: "/ajax-chk-login",
      data: {
        loginEmail: myLoginEmail,
        loginPass: myLoginPass,
      },
    };
    $.ajax(obj)
      .done(function (myResponse) {
        localStorage.setItem("activeUser", myLoginEmail); //*************** */

        if (myResponse.trim() == "Shark")
          window.location.href = "dash-shark.html";
        else if (myResponse.trim() == "Pitcher")
          window.location.href = "dash-pitcher.html";
        else $("#loginResult").html(myResponse);
      })
      .fail(function (msg) {
        alert("");
        $("#loginResult").html(msg);
      });
  });

  //---------------------------------------------------------
  $("#btnContact").click(function () {
    var name = $("#contactName").val();
    var email = $("#contactEmail").val();
    var mob = $("#contactMobile").val();
    var message= $("#contactTextarea").val();
    var obj = {
      type: "post",
      url: "/db-contact-us",
      data: {
        namee:name,
        emaill: email,
        mobb:mob,
        messagee:message,
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



