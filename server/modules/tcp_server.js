var tcpServer = function() {
    var net = require('net'),
        config = require('../config'),
        utils = require('./utils'),
        clients = [],

        start = function() {
            var server = net.createServer();


            server.listen(config.tcp_port, function() {
                utils.log('TCP server created on port ' + config.tcp_port);
            });

            server.on('error', function (err) {
                utils.log('Error caught on tcp server: ' + err);
            });

            server.on('connection', function(client) {
                utils.log('client connected with IP address ' + client.remoteAddress);

                client.write('--- Welcome to RElab SMS and Twitter net_server ---\n');

                clients.push(client);

                client.on('end', function () {
                    for (var i = 0; i < clients.length; i++) {
                        if (clients[i] == client) {
                            clients.splice(i, 1);
                            utils.log('Client removed. left: ' + clients.length);
                            break;
                        }
                    }

                    client.end();
                });
            });
        },

        sendToClients = function(data) {
            var addresses = [];

            for(var i = 0; i < clients.length; i++) {
                clients[i].write(data + '\n');
                addresses.push(clients[i].remoteAddress);
            }

            if(addresses.length) {
                utils.log('SMS sent to ' + (addresses.toString()));
            }
        };

    return {
        start: start,
        sendToClients: sendToClients
    }
}();

module.exports = tcpServer;