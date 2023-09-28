const nodemailer = require("nodemailer");
const Mailgen = require('mailgen');
const {EMAIL,PASSWORD} = require('../env')

let config = {
  service: 'gmail',
  auth: {
    user:EMAIL,
    pass:PASSWORD
  }
}
let transporter = nodemailer.createTransport(config);
const sendSGMail = async ({
  to,
  sender,
  subject,
  html,
  attachments,
  text,
}) => {
  try {
    const from = EMAIL;

    const msg = {
      to: to, // Change to your recipient
      from: from, // Change to your verified sender
      subject: subject,
      html: html,
      // text: text,
      attachments,
    };

    return transporter.sendMail(msg);
  } catch (error) {
    console.log(error);
  }
};

exports.sendEmail = async (args) => {
  if (!process.env.NODE_ENV === "development") {
    return Promise.resolve();
  } else {
    return sendSGMail(args);
  }
};
