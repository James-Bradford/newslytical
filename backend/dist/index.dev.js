"use strict";

/**
 * Summary. ExpressJS Endpoints
 * Description. Provides the endpoints for Newslytical backend
 * 
 * @author James Bradford
 * @version 1.0
 */
//Import Dependencies
var express = require('express');

var app = express();

var cors = require('cors');

var Twitter = require('twitter');

var googleTrends = require('google-trends-api');

var axios = require('axios');

require('dotenv').config();

app.use(cors()); //Use the Twitter NPM package

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
}); // Get a Tweet by ID

app.get('/api/twitter/tweet/:id', function (req, res) {
  client.get("statuses/show", {
    id: req.params.id,
    tweet_mode: 'extended'
  }, function (error, tweet, response) {
    res.send(tweet);
  });
}); // Get a trends for a given location

app.get('/api/twitter/trends/:id', function (req, res) {
  client.get("trends/place", {
    id: req.params.id
  }, function (error, trends, response) {
    res.send(trends);
  });
}); // Perform a whois lookup on a given domain

app.get('/api/whois/:domain', function (req, res) {
  axios.get("https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=".concat(process.env.WHOIS_API_KEY, "&outputFormat=JSON&domainName=").concat(req.params.domain)).then(function (response) {
    res.send(response.data);
  })["catch"](function (err) {
    return console.log(err);
  });
}); // Get the daily trends for a given country

app.get('/api/trends/daily/:geo', function (req, res) {
  googleTrends.dailyTrends({
    geo: req.params.geo
  }).then(function (results) {
    res.send(results);
  })["catch"](function (err) {
    console.error('Oh no there was an error', err);
  });
}); // Get the interest over time for a given word

app.get('/api/trends/interest/:word', function (req, res) {
  googleTrends.interestOverTime({
    keyword: req.params.word
  }).then(function (results) {
    res.send(results);
  })["catch"](function (err) {
    console.error('Oh no there was an error', err);
  });
}); // Get related topics for a given word

app.get('/api/trends/related/:word', function (req, res) {
  googleTrends.relatedTopics({
    keyword: req.params.word
  }).then(function (results) {
    res.send(results);
  })["catch"](function (err) {
    console.error('Oh no there was an error', err);
  });
}); //Start Server

var port = process.env.PORT || 3000;
app.listen(port, function () {
  return console.log("Listening on port ".concat(port, "..."));
});
//# sourceMappingURL=index.dev.js.map
