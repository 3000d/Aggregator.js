var httpServer = function() {
    var http = require('http'),
        url = require('url'),
        querystring = require('querystring'),

        start = function (http_port, sendToClients, utils) {
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
                        utils.log('SMS received. Sender: ' + data.sender + ' - text: ' + data.text);
                        sendToClients(data.sender + ": " + data.text);
                    });

                    response.writeHead(200);
                    response.end();
                }
            }
            http.createServer(onRequest).listen(http_port);
            utils.log('HTTP server created');
        };

    return {
        start: start
    }
}();

module.exports = httpServer;