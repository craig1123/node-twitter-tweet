var twit = require('twit');
// var challenges = require('./challenges'); // daily
var weeklyChallenges = require('./weeklyChallenges');
var quotes = require('./quotes');
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

// get week number of the year
function getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    // Get first day of year
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    // Calculate full weeks to nearest Thursday
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

function post() {
  var date = new Date();
  var weekOfTheYear = getWeekNumber(date);
  var dayIndex = date.getDOY() - 1;
  var status = weeklyChallenges[weekOfTheYear];
  var quotesStatus = quotes[dayIndex];

  if (status) {
      status += "\n#52weeksofcode";
  } else if (quotesStatus) {
      status = quotesStatus + "\n\n#52weeksofcode";
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

// if Monday, post a tweet
if (new Date().getDay() === 1) {
    post();
}
