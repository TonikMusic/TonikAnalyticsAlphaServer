const EmailList = require('../models/EmailList');
const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');

let auth = {
  auth: {
    api_key: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN
  }
};

const nodemailerMailgun = nodemailer.createTransport(
  mg(auth)
);

const emailUser = async (req, res) => {
  let emailList = await new EmailList();

  emailList.firstName = req.body.firstName;
  emailList.email = req.body.email;

  await emailList.save().then(email => {
    res.json({
      message: 'Thank you for showing intrest in Tonik!'
    });
  });
};

module.exports = {
  emailUser
};
