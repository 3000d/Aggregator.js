var mysql = function() {
    var mysql = require('mysql'),
        utils = require('./utils'),
        config = require('../config/config'),
        connection,

        connect = function() {
            if(config.use_db) {
                connection = mysql.createConnection(config.db);
                connection.connect();
            }
        },

        insertIntoDB = function(type, data) {
            if(config.use_db) {
                var query = "INSERT INTO " + config.db_table + " (type, text, sender_info, sent_dt) " +
                    "VALUES('" + type + "', '" + data.text + "', '" + data.sender + "', NOW())";

                connection.query(query, function (err, results) {
                    if(err) {
                        utils.log('Error inserting in DB: ' + err);
                    } else {
                        utils.log('Data inserted into DB');
                    }
                });
            }
        };

    return {
        connect: connect,
        insertIntoDB: insertIntoDB
    }
}();

module.exports = mysql;