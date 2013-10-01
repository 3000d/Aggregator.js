var socket = function() {
    var config = require('../config/config'),
        utils = require('./utils'),
        constants = require('./constants'),
        io = require('socket.io').listen(config.web_port),
        sockets = [];

    var start = function(http_server) {
        io.set('log level', config.socket_io_debug_level);

        io.sockets.on('connection', function (socket) {
            utils.log(constants.log.INFO, 'Websocket connected');
            sockets.push(socket);

            socket.on('disconnect', function() {
                utils.log(constants.log.INFO, 'Websocket removed.');
            });
        });
    };

    var sendToWeb = function(data) {
        io.sockets.emit('viewallonne', data);
        utils.log(constants.log.INFO, 'Websocket sent');
    };

    return {
        start: start,
        sendToWeb: sendToWeb
    }
}();

module.exports = socket;