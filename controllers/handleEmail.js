const EmailList = require('../models/EmailList');
const mailgun = require('mailgun-js');

const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN
});

const emailUser = async (req, res) => {
  let emailList = await new EmailList();

  emailList.firstName = req.body.firstName;
  emailList.email = req.body.email;

  await emailList.save().then(email => {
    let recipentEmail = email.email;
    let recipentName = email.firstName;
    const data = {
      from: 'tonik.music.io@gmail.com',
      to: recipentEmail,
      subject: 'Here is some more info on Tonik',
      text: `Hello ${recipentName},
      
        Thank you for showing interest in Tonik if you would like more information about Tonik, dont be afraid to email us at tonik.music.io@gmail.com. We will get back to you in a timely manner.
        Thank you and have a wonderful day,
        Your friends at Tonik
        `
    };

    mg.messages().send(data, function(err, body) {
      console.log(body);
    });

    res.json({
      message: 'Thank you for showing intrest in Tonik!'
    });
  });
};

module.exports = {
  emailUser
};
