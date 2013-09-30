var tcpServer = function() {
    var net = require('net'),
        config = require('../config/config'),
        utils = require('./utils'),
        constants = require('./constants'),
        clients = [],

        start = function() {
            var server = net.createServer();


            server.listen(config.tcp_port, function() {
                utils.log('TCP server created on port ' + config.tcp_port);
            });

            server.on('error', function (err) {
                utils.log('Error caught on tcp_server server: ' + err);
            });

            server.on('connection', function(client) {
                utils.log('client connected with IP address ' + client.remoteAddress);

                client.write('--- Welcome to RElab SMS and Twitter net server ---\n');

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

        sendToClients = function(messageType, data) {
            try {
                var addresses = [];

                for(var i = 0; i < clients.length; i++) {
                    clients[i].write(formatToProtocol(messageType, data));
                    addresses.push(clients[i].remoteAddress);
                }

                if(addresses.length) {
                    utils.log('SMS sent to ' + (addresses.toString()));
                }
            } catch(err) {
                utils.log('Error sending to clients: ' + err);
            }
        },

        formatToProtocol = function(messageType, data) {
            if(data.text != undefined) {
                if(data.text.indexOf(config.protocol.end_of_line) != -1) {
                    data.text = data.text.replace(config.protocol.end_of_line, '');
                }
                if(data.text.indexOf(config.protocol.separator) != -1) {
                    data.text = data.text.replace(config.protocol.separator, '');
                }

                return "" +
                    (messageType == constants.MESSAGE_TYPE.TWEET ? 1 : 0) +
                    config.protocol.separator +
                    data.sender +
                    config.protocol.separator +
                    data.text +
                    config.protocol.end_of_line;
            }
        };

    return {
        start: start,
        sendToClients: sendToClients
    }
}();

module.exports = tcpServer;