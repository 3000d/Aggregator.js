var tcp_server = require('./modules/tcp_server');
var http_server = require('./modules/http_server');
var mysql = require('./modules/mysql_module');
var twitter_server = require('./modules/twitter_module');

mysql.connect();
tcp_server.start();
twitter_server.start(tcp_server.sendToClients, mysql.insertIntoDB);
http_server.start(tcp_server.sendToClients, mysql.insertIntoDB);