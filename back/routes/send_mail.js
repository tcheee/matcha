"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function send_mail(mail, fname, id_user) {
    console.log(id_user);
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Tom de Matcha 👻" <tom@matcha.com>', // sender address
    to: mail, // list of receivers
    subject: "Hello, please confirm you Matcha account 👋👋👋", // Subject line
    text: "Hello " + fname + ", you create an account to access Matcha. Please click on this link to active your account : http://localhost:4200/" + id_user, // plain text body
    //html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  return (info.messageId);
}

send_mail().catch(console.error);

module.exports.send_mail = send_mail;