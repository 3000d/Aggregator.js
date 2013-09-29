var mysql = function() {
    var mysql = require('mysql'),
        utils = require('./utils'),
        config = require('../config/config'),
        connection,

        connect = function() {
            connection = mysql.createConnection(config.db);
            connection.connect();
        },

        insertIntoDB = function(data) {

            var query = "INSERT INTO " + config.db_table + " (sms_text, sender_number) " +
                "VALUES('" + data.text + "', '" + data.sender + "')";

            connection.query(query, function (err, results) {
                if(err) {
                    utils.log('Error inserting in DB: ' + err);
                } else {
                    utils.log('Data inserted into DB');
                }
            });
        };

    return {
        connect: connect,
        insertIntoDB: insertIntoDB
    }
}();

module.exports = mysql;