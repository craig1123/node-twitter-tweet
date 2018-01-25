var twit = require('twit');
var config = require('./config.js');
var challenges = require('./challenges');
var sendEmailToMyself = require('./emailCtrl');

var Twitter = new twit(config);

var tick = 0

function post() {
  if (tick > challenges.length - 1) {
    tick = 0;
  }
  var status = challenges[tick];
  if (status.length > 280) {
    var options = {
      length: status.length,
      number: tick
    };
    sendEmailToMyself(options);
  } else {
    Twitter.post('statuses/update', { status: status }, function(error) {
      if (error) {
        console.log('error:', error);
      }
    });
  }
  tick += 1;
}

// post a tweet as soon as program is running...
post();

// post a tweet every day
setInterval(post, 86400000);
