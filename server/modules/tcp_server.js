var net = require('net');

var HOST = "0.0.0.0";
var PORT = 14240;

function start(utils) {
    var server = net.createServer();


    server.listen(PORT, function() {
        utils.log('TCP server created');
        try {

        } catch(err) {
            utils.log("--- error: " + err);
        }
    });

    server.on('connection', function(client) {
        utils.log('client connected');

        client.write('--- Welcome to RElab SMS and Twitter net_server ---');

        client.on('end', function () {
            utils.log('Subscriber left');
            client.end();
        });
    });
}

exports.start = start;