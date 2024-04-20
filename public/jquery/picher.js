function doOnLoad() {
    var active = localStorage.getItem("activeUser");
    document.querySelector("#picTxtEamil").value = active
}

function doPrev(refFile, prevImg) {
    const [file] = refFile.files
    if (file) {
        prevImg.src = URL.createObjectURL(file)
    }
}

$(document).ready(function () {
    $("#btnLogout").click(function () {
        localStorage.removeItem("activeUser");
        location.href = "index.html";
    });

    $("#pbtnSearch").click(function () {

        var myKuchEmail = $("#picTxtEamil").val();

        var obj = {
            type: "get",
            url: "/json-get-record-pitcher",
            data: {
                kuchEmail: myKuchEmail

            }
        }

        $.ajax(obj).done(function (jsonAryResult) {

            if (jsonAryResult.length == 0)
                alert("Firstly,fill details");
            else {
                $("#txtFullname").val(jsonAryResult[0].name);//use table wale col ka name
                $("#txtContact").val(jsonAryResult[0].contact);//use table wale col ka name
                $("#txtAddress").val(jsonAryResult[0].address);//use table wale col ka name
                $("#txtCity").val(jsonAryResult[0].city);//use table wale col ka name
                $("#txtId").val(jsonAryResult[0].proof);//use table wale col ka name
                $("#hdn").val(jsonAryResult[0].ppic);
                $("#prev").prop("src", "uploads/" + jsonAryResult[0].ppic);
                $("#txtCategory").val(jsonAryResult[0].category);//use table wale col ka name
                $("#txtUrl").val(jsonAryResult[0].company);//use table wale col ka name
                $("#txtEstd").val(jsonAryResult[0].estd);//use table wale col ka name
                $("#txtPdetails").val(jsonAryResult[0].pdetails);//use table wale col ka name
                $("#txtRevenue").val(jsonAryResult[0].revenue);//use table wale col ka name
                $("#txtGross").val(jsonAryResult[0].gross);//use table wale col ka name
                $("#txtOther").val(jsonAryResult[0].otherinfo);//use table wale col ka name
            }

        }).fail(function (kuchErr) {
            alert(kuchErr.toString());
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
})