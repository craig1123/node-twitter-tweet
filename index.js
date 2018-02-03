var twit = require('twit');
var twitterAutofollowBot = require('twitter-autofollow-bot');
var challenges = require('./challenges');
var sendEmailToMyself = require('./emailCtrl');

var Twitter = new twit({
 consumer_key: process.env.CONSUMER_KEY,
 consumer_secret: process.env.CONSUMER_SECRET,
 access_token: process.env.ACCESS_TOKEN,
 access_token_secret: process.env.ACCESS_TOKEN_SECRET
});
var tick = 0
var stream = Twitter.stream('user');

stream.on('follow', followed)
// follow those who followed me
function followed(e) {
  Twitter.post('friendships/create', {
    'screen_name': e.source.screen_name,
    'follow': true
  });
};

function post() {
  if (tick > challenges.length - 1) {
    tick = 0;
  }
  var status = challenges[tick];
  status += "\n#365daysofcode";
  if (status.length > 280 || status.length < 5) {
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
