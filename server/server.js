var net = require('net');

var HOST = "0.0.0.0";
var PORT = 14240;

var server = net.createServer();

server.listen(PORT, function() {
    log('server created');
    try {

    } catch(err) {
        log("--- error: " + err);
    }
});

server.on('connection', function(client) {
   log('client connected');

    client.write('--- Welcome to RElab SMS and Twitter server ---');

    client.on('end', function () {
        log('Subscriber left');
        client.end();
    });
});


function log(text){
    var logDate = new Date().toString().replace(/G.*/,'').replace(/[a-zA-Z]*\ /,'');
    console.log(logDate+'- '+text);
}