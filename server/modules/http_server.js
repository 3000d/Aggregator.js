var httpServer = function() {
    var http = require('http'),
        url = require('url'),
        querystring = require('querystring'),
        utils = require('./utils'),
        config = require('../config/config'),
        constants = require('./constants'),

        start = function (sendToClients, sendToWeb, insertIntoDB) {
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

                        if(data.sender !== undefined || data.text !== undefined || data.sender == '' || data.sender == '') {
                            utils.log(constants.log.INFO, 'SMS received. Sender: ' + data.sender + ' - text: ' + data.text);

                            sendToClients(constants.message_type.SMS, data);
                            sendToWeb(data);
                            insertIntoDB(constants.message_type.SMS, data);

                        } else {
                            utils.log(constants.log.WARNING, 'SMS received but POST parameters are undefined. Ignored.');
                        }
                    });

                    response.writeHead(200);
                    response.end();
                }
            }

            http.createServer(onRequest).listen(config.http_port);
            utils.log(constants.log.INFO, 'HTTP server created on port ' + config.http_port);
        };

    return {
        start: start
    }
}();

module.exports = httpServer;