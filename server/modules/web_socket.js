var socket = function() {
    var config = require('../config/config'),
        utils = require('./utils'),
        io = require('socket.io').listen(config.web_port),
        sockets = [];

    var start = function(http_server) {
        io.set('log level', config.socket_io_debug_level);

        io.sockets.on('connection', function (socket) {
            utils.log('Websocket connected');
            sockets.push(socket);

            socket.on('disconnect', function() {
                utils.log('Websocket removed.');
            });
        });
    };

    var sendToWeb = function(data) {
        io.sockets.emit('viewallonne', data);
        utils.log('Websocket sent');
    };

    return {
        start: start,
        sendToWeb: sendToWeb
    }
}();

module.exports = socket;