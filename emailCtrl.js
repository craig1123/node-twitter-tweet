var nodemailer = require('nodemailer');
var keys = require('./keys.js');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: keys.user,
    pass: keys.pass
  }
});

var sendEmailToMyself = function(options) {
  transporter.sendMail({
    from: keys.user,
    to: keys.user,
    subject: 'Daily Code Challenge tweet was options.length characters',
    text: 'The tweet was ' + options.length + ' characters long. Go look at the number ' + options.number + '.' +
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
