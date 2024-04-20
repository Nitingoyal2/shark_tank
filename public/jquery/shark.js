function doOnLoad() {
    var active = localStorage.getItem("activeUser");
    document.querySelector("#ShaTxtEamil").value = active;
}

function doPrev(refFile, prevImg) {
    const [file] = refFile.files
    if (file) {
        prevImg.src = URL.createObjectURL(file)
    }
}

function doCart(list) {
    var index = list.selectedIndex;
    document.querySelector('#txtSelect').value += list[index].text + ',';
}



$(document).ready(function () {
    $("#btnLogout").click(function () {
        localStorage.removeItem("activeUser");
        location.href = "index.html";
    });

    //----------------------------------

    //-------------------------------------
    $("#sbtnSearch").click(function () {

        var myKuchEmail = $("#ShaTxtEamil").val();

        var obj = {
            type: "get",
            url: "/json-get-record-shark",
            data: {
                kuchEmail: myKuchEmail

            }
        }

        $.ajax(obj).done(function (jsonAryResult) {

            if (jsonAryResult.length == 0)
                alert("Firstly Fill Details");
            else {
                $("#txtFirstname").val(jsonAryResult[0].fname);//use table wale col ka name
                $("#txtLastname").val(jsonAryResult[0].lname);//use table wale col ka name
                $("#sDOB").val(jsonAryResult[0].dob);//use table wale col ka name
                $("#txtAddress").val(jsonAryResult[0].address);//use table wale col ka name
                $("#inputCity").val(jsonAryResult[0].city);//use table wale col ka name
                $("#txtState").val(jsonAryResult[0].state);//use table wale col ka name
                $("#inputZip").val(jsonAryResult[0].zip);//use table wale col ka name
                $("#txtContact").val(jsonAryResult[0].contact);//use table wale col ka name
                $("#txtDomain").val(jsonAryResult[0].domain);//use table wale col ka name
                $("#txtSelect").val(jsonAryResult[0].selecteddomain);//use table wale col ka name

                $("#txtCompany").val(jsonAryResult[0].company);//use table wale col ka name
                $("#txtInvestment").val(jsonAryResult[0].noofinvest);//use table wale col ka name
                $("#txtInCompany").val(jsonAryResult[0].incompanies);//use table wale col ka name

                $("#hdn").val(jsonAryResult[0].image);
                $("#prev").prop("src", "uploads/" + jsonAryResult[0].image);

                $("#txtOther").val(jsonAryResult[0].otherinfo);//use table wale col ka name


            }

        }).fail(function (kuchErr) {
            // alert(kuchErr.toString());
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