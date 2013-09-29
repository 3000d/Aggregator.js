var twitter = function() {
    var twitter = require('ntwitter'),
        config = require('../config/config'),
        utils = require('./utils'),

        start = function(sendToClients, sendToWeb, insertIntoDB) {
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
                        var username = '';
                        try {
                            username = data.user.screen_name;
                        } catch(err) {
                            utils.log('Error: could not get Twitter username');
                        }

                        if(text !== undefined) {
                            var formattedData = {text: text, sender: username};

                            utils.log('Tweet received. Sender: ' + username + ' - text: ' + text);

                            sendToClients(username + ': ' + removeFiltersFromText(text, config.twitter.filters));
                            sendToWeb(formattedData);
                            insertIntoDB('tweet', formattedData);
                        } else {
                            utils.log('Tweet received but data is undefined. Ignored.');
                        }
                    });

                    stream.on('end', function (response) {
                        /*TODO handle twitter end event*/
                    });

                    stream.on('destroy', function (response) {
                        /*TODO handle twitter destroy event*/
                    });
                });
            }
        },

        removeFiltersFromText = function(text, filters) {
            if(text !== undefined) {
                for(var i = 0; i < filters.length; i++) {
                    if(text.indexOf('#' + filters[i]) != -1) {
                        text = text.replace('#' + filters[i], '');
                    }
                    if(text.indexOf('@' + filters[i]) != -1) {
                        text = text.replace('@' + filters[i], '');
                    }
                    if(text.indexOf(filters[i]) != -1) {
                        text = text.replace(filters[i], '');
                    }
                }

                return text;
            }
        };

    return {
        start: start
    };
}();

module.exports = twitter;