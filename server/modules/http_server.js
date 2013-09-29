var httpServer = function() {
    var http = require('http'),
        url = require('url'),
        querystring = require('querystring'),
        utils = require('./utils'),
        config = require('../config/config'),

        start = function (sendToClients, insertIntoDB) {
            function onRequest(request, response) {
                var pathname = url.parse(request.url).pathname;
                if(pathname == '/sms_in') {
                    var postData = "";

                    request.setEncoding('utf8');

                    request.addListener('data', function (chunk) {
                        postData += chunk;
                    });

                    request.addListener('end', function () {
                        var data = querystring.parse(postData);

                        if(data.sender !== undefined && data.text !== undefined) {
                            utils.log('SMS received. Sender: ' + data.sender + ' - text: ' + data.text);
                            sendToClients(data.sender + ": " + data.text);
                            insertIntoDB('sms', data);
                        } else {
                            utils.log('SMS received but POST parameters are undefined. Ignored.');
                        }
                    });

                    response.writeHead(200);
                    response.end();
                }
            }

            http.createServer(onRequest).listen(config.http_port);
            utils.log('HTTP server created on port ' + config.http_port);
        };

    return {
        start: start
    }
}();

module.exports = httpServer;