var tcp = require('./modules/tcp_server');
var http = require('./modules/http_server');
var utils = require('./modules/utils');

tcp.start(utils);
http.start(tcp.getClients, utils);
