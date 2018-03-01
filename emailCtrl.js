var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.USER,
    pass: process.env.PASS
  }
});

var sendEmailToMyself = function(options) {
  transporter.sendMail({
    from: process.env.USER,
    to: process.env.USER,
    subject: 'Daily Code Challenge tweet was ' + options.number + ' characters',
    text: 'The tweet was ' + options.number + ' characters long. Go look at the number ' + options.dayOfYear + '.' +
    '\n\nThen go to https://twitter.com/365daysofcode and write a new tweet'
  }, function(error){
    if (error) {
      console.log(error);
    } else {
      console.log('Your message was sent successfully!');
    }
  });
};

module.exports = sendEmailToMyself;
