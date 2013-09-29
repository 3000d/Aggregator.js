var tcp = require('./modules/tcp_server');
var http = require('./modules/http_server');
var utils = require('./modules/utils');
var config = require('./config');

tcp.start(config.tcp_port, utils);
http.start(config.http_port, tcp.sendToClients, utils);