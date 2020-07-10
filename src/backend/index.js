//Import Dependencies
const express = require('express');
const app = express();
var cors = require('cors');
var Twitter = require('twitter');

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
    app.get('/api/twitter/:id', (req, res) => {
        client.get(`statuses/show`, { id: req.params.id, tweet_mode: 'extended' }, function (error, tweet, response) {
        res.send(tweet);
    });})

// Perform a whois lookup on a given domain
    app.get('/api/whois/:domain', (req, res) => {
        axios.get(`https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=${process.env.WHOIS_API_KEY}&outputFormat=JSON&domainName=${req.params.domain}`)
        .then(response => {
            res.send(response.data);
        })
        .catch(err => console.log(err));
    })

//Start Server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
