var tcp = require('./modules/tcp_server');
var http = require('./modules/http_server');

tcp.start();
http.start(tcp.sendToClients);