var httpServer = function() {
    var http = require('http'),
        url = require('url'),
        querystring = require('querystring'),
        PORT = 14250,

        start = function (tcpClients, utils) {
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

                        var clients = tcpClients(),
                            addresses = [];
                        for(var i = 0; i < clients.length; i++) {
                            clients[i].write('sms from ' + data.sender + ': ' + data.text + '\n');
                            addresses.push(clients[i].remoteAddress);
                        }
                        utils.log('SMS sent to ' + (addresses.toString()));
                    });

                    response.writeHead(200);
                    response.end();
                }
            }
            http.createServer(onRequest).listen(PORT);
            utils.log('HTTP server created');
        };

    return {
        start: start
    }
}();

module.exports = httpServer;