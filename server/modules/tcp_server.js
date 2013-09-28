

var tcpServer = function() {
    var net = require('net'),
        PORT = 14240,
        clients = [],

        start = function(utils) {
            var server = net.createServer();


            server.listen(PORT, function() {
                utils.log('TCP server created');
                try {

                } catch(err) {
                    utils.log("--- error: " + err);
                }
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

        getClients = function() {
            return clients;
        };

    return {
        start: start,
        getClients: getClients
    }
}();

module.exports = tcpServer;