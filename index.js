var twit = require('twit');
var config = require('./config.js');
var challenges = require('./challenges/challenges');

var Twitter = new twit(config);

function post() {
  var date = new Date();
  var status = challenges.medium[0];

  Twitter.post('statuses/update', { status: status }, function(error) {
    if(error){
      console.log(error);
    }
  });
}

// post a tweet as soon as program is running...
post();

// post a tweet every day
setInterval(post, 86400000);
