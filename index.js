var twit = require('twit');
var config = require('./config.js');
var challenges = require('./challenges/challenges');

var Twitter = new twit(config);

var difficultySystem = {
  0: 'hard',
  1: 'easy',
  2: 'easy',
  3: 'medium',
  4: 'medium',
  5: 'medium',
  6: 'hard'
}

function post() {
  var date = new Date();
  var difficulty = difficultySystem[date.getDay()];
  var difficultyArray = challenges[difficulty];
  var status = ''
  Twitter.post('statuses/update', { status: status }, function(error) {
    if (error) {
      console.log('error:', error);
    }
  });
}

// post a tweet as soon as program is running...
post();

// post a tweet every day
setInterval(post, 86400000);
