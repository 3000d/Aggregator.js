var tcp = require('./modules/tcp_server');
var http = require('./modules/http_server');
var utils = require('./modules/utils');
var config = require('./config');

tcp.start();
http.start(tcp.sendToClients);