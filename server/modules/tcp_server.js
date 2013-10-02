var tcpServer = function() {
    var net = require('net'),
        config = require('../config/config'),
        utils = require('./utils'),
        constants = require('./constants'),
        clients = [],

        start = function() {
            var server = net.createServer();


            server.listen(config.tcp_port, function() {
                utils.log(constants.log.INFO, 'TCP server created on port ' + config.tcp_port);
            });

            server.on('error', function (err) {
                utils.log(constants.log.ERROR, 'Error caught on tcp_server server: ' + err);
            });

            server.on('connection', function(client) {
                utils.log(constants.log.INFO, 'client connected with IP address ' + client.remoteAddress);

                client.write('--- Welcome to RElab SMS and Twitter net server ---\n');

                clients.push(client);

                client.on('end', function () {
                    removeClient(client);
                    client.end();
                });

                client.on('error', function (err) {
                    utils.log(constants.log.ERROR, 'Error caught on socket: ' + err);
                    removeClient(client);
                });
            });
        },

        removeClient = function(client) {
            for (var i = 0; i < clients.length; i++) {
                if (clients[i] == client) {
                    clients.splice(i, 1);
                    utils.log(constants.log.INFO, 'Client removed. left: ' + clients.length);
                    break;
                }
            }
        },

        sendToClients = function(messageType, data) {
            try {
                var addresses = [];

                for(var i = 0; i < clients.length; i++) {
                    clients[i].write(formatToProtocol(messageType, data));
                    addresses.push(clients[i].remoteAddress);
                }

                if(addresses.length) {
                    utils.log(constants.log.INFO, 'SMS sent to ' + (addresses.toString()));
                }
            } catch(err) {
                utils.log(constants.log.ERROR, 'Error sending to clients: ' + err);
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
                    (messageType == constants.message_type.TWEET ? 1 : 0) +
                    config.protocol.separator +
                    data.sender +
                    config.protocol.separator +
                    data.text +
                    config.protocol.end_of_line;
            } else {
                return "";
            }
        };

    return {
        start: start,
        sendToClients: sendToClients
    }
}();

module.exports = tcpServer;