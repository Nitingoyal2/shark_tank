var express = require("express");
var fileuploader = require("express-fileupload");
var path = require("path");

var mysql = require("mysql");
var nodemailer = require("nodemailer");

var app = express();

app.use(express.static("public")); //middleware to access public folder's file

app.listen(2090, function () {
    console.log("server started....");
})

var dbConfig = {
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "project",
    dateStrings: true
}
var dbRef = mysql.createConnection(dbConfig);
dbRef.connect(function (err) {
    if (err == null) {
        console.log("connected server....");
    }
    else {
        console.log(err.toString());
    }
})

app.use(express.urlencoded(true)); //creats JSON object of Binary data
app.use(fileuploader());


app.get("/", function (req, resp) {
    var dir = process.cwd;
    console.log(dir);

    var dir2 = __dirname;
    var file = __filename;
    console.log(dir2 + " " + file);

    var pathFile = path.join(__dirname, "public", "index.html");
    resp.sendFile(pathFile);
})

//ajax
app.get("/ajax-chk-user", function (req, resp) {
    var emailll = req.query.emaill;
    dbRef.query("select * from signup where email=?", [emailll], function (err, jsonAryResult) {
        if (err != null) {
            resp.send(err.toString());
        }
        else if (jsonAryResult.length == 1) {
            resp.send("ID already taken , Please Choose Different ID");
        }
        else {
            resp.send("Available");
        }
    })
})

app.post("/db-Signup", function (req, resp) {
    var emailll = req.body.emaill;
    var pswddd = req.body.pswdd;
    var typeee = req.body.typee;
    var mailer = req.body.emaill;

    dbRef.query("insert into signup values(?,?,?,1)", [emailll, pswddd, typeee], function (err) {
        if (err == null) {
            console.log("record saved");
            resp.send("Signup successfully");
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'sharktank1502@gmail.com',
                    pass: 'dydjfcqouvbjjbqb'
                }
            });

            var mailOptions = {
                from: 'sharktank1502@gmail.com',
                to: mailer,
                subject: 'Welcome To Shark Tank',
                text: 'Sign Up Successfully.....'
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    // alert("heelo")
                    console.log(error);
                }
                else {
                    console.log('Email sent:' + info.response);
                }
            });



        }
        else {
            console.log(err.toString());
            resp.send(err.toString());
        }
    })
});

app.post("/ajax-chk-login", function (req, resp) {
    var lEmail = req.body.loginEmail;
    var lPass = req.body.loginPass;

    dbRef.query("select * from signup where email=? and password=?", [lEmail, lPass], function (err, jsonAryResult) {

        if (err) {
            resp.send("error");
        }

        else if (jsonAryResult.length == 0) {
            resp.send("Invalid")
        }
        else {//1 record found - uid pwd is correct
            if (jsonAryResult[0].status == 0)
                resp.send("Blocked")
            else
                resp.send(jsonAryResult[0].usertype);
        }
    });

})
//----------------------------------------
app.post("/submit-pitcher-process", function (req, resp) {
    var email = req.body.pEmail;
    var name = req.body.pName;
    var contact = req.body.pCon;
    var address = req.body.txtAddress;
    var city = req.body.pCity;
    var proof = req.body.pId
    var image = req.files.txtPic.name;
    var desPath = path.join(__dirname, "public/uploads", image);

    req.files.txtPic.mv(desPath, function () {
        console.log("File Saved in Uploads Successfully");
    })

    var cat = req.body.pCat;
    var url = req.body.pUrl;
    var estd = req.body.pEstd;
    var pdetail = req.body.pPDetail;
    var revenue = req.body.pRevenue;
    var gross = req.body.pGross;
    var odetail = req.body.pODetail;

    dbRef.query("insert into pprofile values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [email, name, contact, address, city, proof, image, cat, url, estd, pdetail, revenue, gross, odetail], function (err) {
        if (err == null) {
            console.log("Record Saved");
            resp.send("Signed Up successfully");
            // resp.redirect("signup-result.html");
        }
        else {

            console.log(err.toString());
            resp.send(err.toString());
        }
    })
})
//=====================================
app.post("/update-process-pitcher", function (req, resp) {
    console.log(req.body);
    var email = req.body.pEmail;
    var name = req.body.pName;
    var contact = req.body.pCon;
    var address = req.body.txtAddress;
    var city = req.body.pCity;
    var proof = req.body.pId;
    var image;
    if (req.files != null) {
        image = req.files.txtPic.name;  //want to change

        var desPath = path.join(__dirname, "public/uploads", image);


        req.files.txtPic.mv(desPath, function () {
            console.log("File Saved in Uploads Successfully");
        })
    }
    else
        image = req.body.hdn;//keep old f

    var cat = req.body.pCat;
    var url = req.body.pUrl;
    var estd = req.body.pEstd;
    var pdetail = req.body.pPDetail;
    var revenue = req.body.pRevenue;
    var gross = req.body.pGross;
    var odetail = req.body.pODetail;

    dbRef.query("update pprofile set name=?,contact=?,address=?,city=?,proof=?,ppic=?,category=?,company=?,estd=?,pdetails=?,revenue=?,gross=?,otherinfo=? where email=? ", [name, contact, address, city, proof, image, cat, url, estd, pdetail, revenue, gross, odetail, email], function (err, result) {

        if (err != null) {
            resp.send(err.toString());

        }
        else if (result.affectedRows == 1) {
            console.log("Record Updated");
            resp.send("Updated successfully");

        }
        else if (result.affectedRows == 0) {
            resp.send("Please Fill details, Firstly");
        }
        else {
            console.log(err.toString());
            resp.send(err.toString());
        }
    })
});

//-----------------------------------

app.get("/json-get-record-pitcher", function (req, resp) {
    var emailKuch = req.query.kuchEmail;
    console.log(emailKuch);

    dbRef.query("select * from pprofile where email=?", [emailKuch], function (err, jsonAryResult) {
        console.log(jsonAryResult)
        if (err != null)
            resp.send(err.toString());

        else
            resp.json(jsonAryResult);
    })
})

// ----------------------------------------
app.post("/send-process-shark", function (req, resp) {
    var email = req.body.sEmail;
    var fname = req.body.sFName;
    var lname = req.body.sLName;
    var dob = req.body.sDob;
    var address = req.body.sAdd;
    var city = req.body.sCity;
    var state = req.body.sState;
    var zip = req.body.sZip;
    var contact = req.body.sCon;
    var field = req.body.txtDomain;
    var selecteddomain = req.body.txtSelect;
    var company = req.body.sCompany;
    var noofinvest = req.body.sInvestment;
    var incompany = req.body.sInCompany;
    var image = req.files.txtSPic.name;
    var desPath = path.join(__dirname, "public/uploads", image);

    req.files.txtSPic.mv(desPath, function () {
        console.log("File Saved in Uploads Successfully");
    })
    var odetail = req.body.sODetail;

    dbRef.query("insert into pshark values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [email, fname, lname, dob, address, city, state, zip, contact, field, selecteddomain, company, noofinvest, incompany, image, odetail], function (err, result) {
        if (err == null) {
            console.log("Record Saved");
            resp.send("Signed Up successfully");
            // resp.redirect("signup-result.html")
        }
        else {

            console.log(err.toString());
            resp.send(err.toString());
        }
    })
})
//-----------------------------------
app.post("/edit-process-shark", function (req, resp) {
    console.log(req.body);
    var email = req.body.sEmail;
    var fname = req.body.sFName;
    var lname = req.body.sLName;
    var dob = req.body.sDob;
    var address = req.body.sAdd;
    var city = req.body.sCity;
    var state = req.body.sState;
    var zip = req.body.sZip;
    var contact = req.body.sCon;
    var field = req.body.txtDomain;
    var selecteddomain = req.body.txtSelect;
    var company = req.body.sCompany;
    var noofinvest = req.body.sInvestment;
    var incompany = req.body.sInCompany;
    var image;
    if (req.files != null) {
        image = req.files.txtSPic.name;  //want to change

        var desPath = path.join(__dirname, "public/uploads", image);


        req.files.txtSPic.mv(desPath, function () {
            console.log("File Saved in Uploads Successfully");
        })
    }
    else
        image = req.body.hdn;//keep old f


    var odetail = req.body.sODetail;


    dbRef.query("update pshark set fname=?,lname=?,dob=?,address=?,city=?,state=?,zip=?,contact=?,domain=?,selecteddomain=?,company=?,noofinvest=?,incompanies=?,image=?,otherinfo=? where email=? ", [fname, lname, dob, address, city, state, zip, contact, field, selecteddomain, company, noofinvest, incompany, image, odetail, email], function (err, result) {

        if (err != null) {
            resp.send(err.toString());

        }
        else if (result.affectedRows == 1) {
            console.log("Record Updated");
            resp.send("Updated successfully");

        }
        else if (result.affectedRows == 0) {
            resp.send("Invalid Id");
        }
        else {
            console.log(err.toString());
            resp.send(err.toString());
        }
    })
});

//-------------------------------------------------------------
app.get("/json-get-record-shark", function (req, resp) {
    var emailKuch = req.query.kuchEmail;
    console.log(emailKuch);

    dbRef.query("select * from pshark where email=?", [emailKuch], function (err, jsonAryResult) {
        console.log(jsonAryResult)
        if (err != null)
            resp.send(err.toString());

        else
            resp.json(jsonAryResult);
    })
})

//-------------------------------------------
app.post("/db-change-shark", function (req, resp) {
    var emailll = req.body.emaill;
    var oldpassss = req.body.oldpasss;
    var newpassss = req.body.newpasss;
    dbRef.query("update signup set password=? where email=? and password=? and usertype='Shark' ", [newpassss, emailll, oldpassss], function (err, result) {
        if (err == null) {
            console.log("record saved");
            resp.send("Password Chnage successfully");
        }
        else {
            console.log(err.toString());
            resp.send(err.toString());
        }
    })
});
//-----------------------------------------------
//-------------------------------------------
app.post("/db-change-pitcher", function (req, resp) {
    var emailll = req.body.emaill;
    var oldpassss = req.body.oldpasss;
    var newpassss = req.body.newpasss;
    dbRef.query("update signup set password=? where email=? and password=? and usertype='Pitcher' ", [newpassss, emailll, oldpassss], function (err, result) {
        if (err == null) {
            console.log("record saved");
            resp.send("Password Change successfully");
        }
        else {
            console.log(err.toString());
            resp.send(err.toString());
        }
    })
});



//88888888888888888888888888888888888888888888888888888888888888888888888

//=======================  angular part   ===============================

//88888888888888888888888888888888888888888888888888888888888888888888888

app.get("/show-all-users", function (req, resp) {
    dbRef.query("select * from signup", function (err, table) {
        console.log(err);
        if (err)
            resp.send(err.tostring());
        else
            resp.json(table);
    })
});

//=======================================================================

app.get("/block-user", function (req, resp) {
    var data = [req.query.Email];
    dbRef.query("update signup set status=0 where email=?", data, function (err, table) {
        if (err)
            resp.send(err.sqlMsg);
        else
            resp.json(table);
    })
});

//========================================================================

app.get("/activate-user", function (req, resp) {
    var data = [req.query.Email];
    dbRef.query("update signup set status=1 where email=?", data, function (err, table) {
        if (err)
            resp.send(err.sqlMsg);
        else
            resp.json(table);
    })
});

//************************       Show All Shark     **************************

app.get("/show-all-Shark", function (req, resp) {
    dbRef.query("select * from pshark", function (err, table) {
        console.log(err);
        if (err)
            resp.send(err.tostring());
        else
            resp.json(table);
    })
});

//*************************      Show All Pitcher     **************************

app.get("/show-all-Pitcher", function (req, resp) {
    dbRef.query("select * from pprofile", function (err, table) {
        console.log(err);
        if (err)
            resp.send(err.tostring());
        else
            resp.json(table);
    })
});

//-==============================================================
app.get("/show-all-feedback", function (req, resp) {
    dbRef.query("select * from feedback1", function (err, table) {
        console.log(err);
        if (err)
            resp.send(err.tostring());
        else
            resp.json(table);
    })
});

//88888888888888888888888888888888888888888888888888888888888888888888888

//=====================Fetch City Of Shark and find shark==========================

//88888888888888888888888888888888888888888888888888888888888888888888888


app.get("/fetch-all-cities", function (req, resp) {
    dbRef.query("select distinct city from pshark", function (err, table) {
        console.log(err);
        if (err)
            resp.send(err.tostring());
        else
            resp.json(table);
    })
});
// //==========================================================================

app.get("/fetch-all-sharks", function (req, resp) {
    var data = [req.query.City, "%" + req.query.field + "%", req.query.Invest];
    dbRef.query("select * from pshark where city=? and domain like? and noofinvest>=?", data, function (err, table) {

        if (err)
            resp.send(err.sqlMsg);
        else
            resp.send(table);
    });
});

//=================contact us==================================

app.post("/db-contact-us", function (req, resp) {

    var name = req.body.namee;
    var email = req.body.emaill;
    var Mobile = req.body.mobb;
    var message = req.body.messagee;
    dbRef.query("insert into feedback1 values(?,?,?,?)", [name, email, Mobile, message], function (err) {
        if (err == null) {
            console.log("Record Saved");
            // console.log(resp.send)
            resp.send("Feedback Saved successfully");
            // resp.redirect("signup-result.html");
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'sharktank1502@gmail.com',
                    pass: 'dydjfcqouvbjjbqb'
                }
            });

            var mailOptions = {
                from: 'sharktank1502@gmail.com',
                to: email,
                cc: 'nitingoyal658930@gmail.com',
                subject: 'Thanks For Giving Feedback ' + name,
                text: 'Thanks For Your message You Have sen to us-->' + message
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    // alert("heelo")
                    console.log(error);
                }
                else {
                    console.log('Email sent:' + info.response);
                    resp.redirect("/")
                }
            });
        }
        else {

            console.log(err.toString());
            resp.send(err.toString());
        }
    })
})


//----------show shark profile-------------------------
app.get("/json-get-record-shark-profile", function (req, resp) {
    var emailKuch = req.query.kuchEmail;
    console.log(emailKuch);

    dbRef.query("select * from pshark where email=?", [emailKuch], function (err, jsonAryResult) {
        console.log(jsonAryResult)
        if (err != null)
            resp.send(err.toString());

        else
            resp.json(jsonAryResult);
    })
})

//=====show pitcher profile--------------

app.get("/json-get-record-pitcher-profile", function (req, resp) {
    var emailKuch = req.query.kuchEmail;
    console.log(emailKuch);

    dbRef.query("select * from pprofile where email=?", [emailKuch], function (err, jsonAryResult) {
        console.log(jsonAryResult)
        if (err != null)
            resp.send(err.toString());

        else
            resp.json(jsonAryResult);
    })
})
// passwrod chnage
app.get("/ajax-chk-pPass", function (req, resp) {
    var oldemail = req.query.email1;
    var oldpass = req.query.oldpasss;
    dbRef.query("select * from signup where email=? and password=?", [oldemail, oldpass], function (err, jsonAryResult) {
        if (err != null) {
            resp.send(err.toString());
        }
        else if (jsonAryResult.length == 1) {
            resp.send("Password Matched");
        }
        else {
            resp.send("Password not matched!");
        }
    })
})

app.get("/ajax-chk-sPass", function (req, resp) {
    var oldemail = req.query.email1;
    var oldpass = req.query.oldpasss;
    dbRef.query("select * from signup where email=? and password=?", [oldemail, oldpass], function (err, jsonAryResult) {
        if (err != null) {
            resp.send(err.toString());
        }
        else if (jsonAryResult.length == 1) {
            resp.send("Password Matched");
        }
        else {
            resp.send("Password not matched!");
        }
    })
})