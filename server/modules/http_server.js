var http = require('http');
var url = require('url');
var querystring = require('querystring');

var PORT = 14250;

function start(tcp, utils) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        if(pathname == '/sms_in') {
            var postData = "";
            utils.log('sms received.');
//        tcp.


            request.setEncoding('utf8');

            request.addListener('data', function (chunk) {
                postData += chunk;
            });

            request.addListener('end', function () {
                var data = querystring.parse(postData);
                utils.log('sender: ' + data.sender);
                utils.log('text: ' + data.text);
            });

            response.writeHead(200);
            response.end();
        }
    }
    http.createServer(onRequest).listen(PORT);
    utils.log('HTTP server created');
}

exports.start = start;