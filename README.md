# node-twitter-tweet

A node based Twitter bot that will tweet daily programming challenges to https://twitter.com/365daysofcode. Hosted by Heroku

## Contributing Challenges

Challenges are in challenges.js if you want to add one. They are ordered by the day of the year. So array[0] is Jan 1, array[31] is Feb 1, array[59] is March 1  and so forth.

Requirements:
* The challenge has to be something that can be programmed.
* Inlcude an example solution for clarification
* Make sure the text is no more than 265 characters long (as I append #365daysofcode to the end). Twitter won't accept it and I'll get an email saying that the string is too long.
* Add the string to the end of the Array (or else you won't see it until January).


