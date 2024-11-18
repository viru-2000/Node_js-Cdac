const express = require("express");
const mongoose = require("mongoose");
const db = require("./database/db.js");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "saurabhgayke45@gmail.com",
    pass: "jops ccaq mhva hnwu",
  },
});

db();

const Schema = mongoose.Schema;
const userschema = new Schema({
  name: String,
  email: String,
  mobile: Number,
});

const usermodel = mongoose.model("newusers", userschema);

var app = express();
app.use(express.json());

app.use(express.urlencoded());

app.get("/add", function (req, res) {
  res.render("adduser.ejs");
});

app.get("/addpro", function (req, res) {
  res.render("addproduct.ejs");
});

app.get("/showpro", async function (req, res) {
  res.render("showproduct.ejs");
});

app.get("/show", async function (req, res) {
  try {
    var result = await usermodel.find();
    res.render("showuser.ejs", { data: result });
  } catch (err) {
    res.send(err.message);
  }
});

app.post("/useraction", async function (req, res) {
  //   console.log(req.body);
  try {
    var record = new usermodel(req.body);
    await record.save();
    main(req.body.email);
    res.redirect("/show");
  } catch (err) {
    res.send(err.message);
  }
});

async function main(emailid) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: "<saurabhgayke45@gmail.com>", // sender address
    to: emailid, // list of receivers
    subject: "Js Application", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

app.listen(9000);
