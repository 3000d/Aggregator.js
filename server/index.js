var tcp = require('./modules/tcp_server');
var http = require('./modules/http_server');
var mysql = require('./modules/mysql_module.js');

mysql.connect();
tcp.start();
http.start(tcp.sendToClients, mysql.insertIntoDB);