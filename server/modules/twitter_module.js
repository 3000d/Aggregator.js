var twitter = function() {
    var twitter = require('ntwitter'),
        config = require('../config/config'),
        utils = require('./utils'),

        start = function(sendToClients, insertIntoDB) {
            if(config.twitter.enable) {
                if(!config.twitter.credentials.consumer_key
                    || !config.twitter.credentials.consumer_secret
                    || !config.twitter.credentials.access_token_key
                    || !config.twitter.credentials.access_token_secret) {
                    utils.throwError('Please add your Twitter credentials in config.js');
                }

                var twitter_server = new twitter({
                    consumer_key: config.twitter.credentials.consumer_key,
                    consumer_secret: config.twitter.credentials.consumer_secret,
                    access_token_key: config.twitter.credentials.access_token_key,
                    access_token_secret: config.twitter.credentials.access_token_secret
                });

                if(!config.twitter.filters.length)
                    utils.throwError('Please add filters for Twitter in config.js');

                twitter_server.stream('statuses/filter', {'track': config.twitter.filters}, function (stream) {
                    utils.log('Twitter Streaming server created with filters ' + config.twitter.filters.toString());

                    stream.on('data', function (data) {
                        var text = data.text;
                        var username = data.user.screen_name;

                        utils.log('Tweet received. Sender: ' + username + ' - text: ' + text);

                        sendToClients(username + ': ' + text);
                        insertIntoDB('tweet', {text: text, sender: username});
                    });

                    stream.on('end', function (response) {
                        /*TODO handle twitter end event*/
                    });

                    stream.on('destroy', function (response) {
                        /*TODO handle twitter destroy event*/
                    });
                });
            }
        };

    return {
        start: start
    };
}();

module.exports = twitter;