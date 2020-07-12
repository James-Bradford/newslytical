//Import Dependencies
const express = require('express');
const app = express();
var cors = require('cors');
var Twitter = require('twitter');
const googleTrends = require('google-trends-api');

var axios = require('axios');

require('dotenv').config();
app.use(cors());

//Use the Twitter NPM package
const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

// Get a Tweet by ID
app.get('/api/twitter/tweet/:id', (req, res) => {
    client.get(`statuses/show`, { id: req.params.id, tweet_mode: 'extended' }, function (error, tweet, response) {
        res.send(tweet);
    });
})

// Get Twitter trends by location
app.get('/api/twitter/trends/:id', (req, res) => {
    client.get(`trends/place`, { id: req.params.id }, function (error, trends, response) {
        res.send(trends);
    });
})

// Perform a whois lookup on a given domain
app.get('/api/whois/:domain', (req, res) => {
    axios.get(`https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=${process.env.WHOIS_API_KEY}&outputFormat=JSON&domainName=${req.params.domain}`)
        .then(response => {
            res.send(response.data);
        })
        .catch(err => console.log(err));
})

// Get the daily trends for a given country
app.get('/api/trends/daily/:geo', (req, res) => {
    googleTrends.dailyTrends({geo: req.params.geo})
        .then(results => {
            res.send(results);
        })
        .catch(function (err) {
            console.error('Oh no there was an error', err);
        });
})

// Get the interest over time for a given word
app.get('/api/trends/interest/:word', (req, res) => {
    googleTrends.interestOverTime({keyword: req.params.word})
        .then(results => {
            res.send(results);
        })
        .catch(function (err) {
            console.error('Oh no there was an error', err);
        });
})

// Get related topics for a given word
app.get('/api/trends/related/:word', (req, res) => {
    googleTrends.dailyTrends({keyword: req.params.word})
        .then(results => {
            res.send(results);
        })
        .catch(function (err) {
            console.error('Oh no there was an error', err);
        });
})

//Start Server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
