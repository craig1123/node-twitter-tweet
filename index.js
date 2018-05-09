var twit = require('twit');
var challenges = require('./challenges');
var sendEmailToMyself = require('./emailCtrl');

var Twitter = new twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

Date.prototype.isLeapYear = function() {
  var year = this.getFullYear();
  if((year & 3) != 0) return false;
  return ((year % 100) != 0 || (year % 400) == 0);
};

// Get Day of Year
Date.prototype.getDOY = function() {
  var dayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  var mn = this.getMonth();
  var dn = this.getDate();
  var dayOfYear = dayCount[mn] + dn;
  if(mn > 1 && this.isLeapYear()) dayOfYear++;
  return dayOfYear;
};

function post() {
  var date = new Date();
  var status = challenges[date.getDOY() - 1];

  // No more challenges
  if (status) {
      status += "\n#365daysofcode";
  } else {
      status = "There are no more challenges available. Please make a Pull Request Here: https://github.com/craig1123/node-twitter-tweet/blob/master/challenges.js"
  }

  // Long Tweets won't go to Twitter
  if (status.length > 280 || status.length < 5) {
    var options = {
      number: status.length,
      dayOfYear: date.getDOY()
    };
    sendEmailToMyself(options);
  } else {
    Twitter.post('statuses/update', { status: status }, function(error) {
      if (error) {
        console.log('error:', error);
      } else {
        console.log('Posted: ', status);
      }
    });
  }
}

// post a tweet
post();
