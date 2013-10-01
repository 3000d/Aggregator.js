var mysql = function() {
    var mysql = require('mysql'),
        utils = require('./utils'),
        constants = require('./constants'),
        config = require('../config/config'),
        connection,

        connect = function() {
            if(config.db.enable) {
                try {
                    connection = mysql.createConnection({
                        host: config.db.host,
                        user: config.db.user,
                        database: config.db.database,
                        password: config.db.password
                    });
                    connection.connect();
                } catch(err) {
                    utils.log(constants.log.ERROR, 'Error connecting to DB: ' + err);
                }
            }
        },

        insertIntoDB = function(type, data) {
            if(config.db.enable) {
                try {
                    var query = "INSERT INTO " + config.db.table + " (type, text, sender_info, sent_dt) " +
                        "VALUES('" + type + "', '" + utils.escapeString(data.text) + "', '" + data.sender + "', NOW())";

                    connection.query(query, function (err, results) {
                        if(err) {
                            utils.log(constants.log.ERROR, 'Error inserting in DB: ' + err);
                        } else {
                            utils.log(constants.log.INFO, 'Data inserted into DB');
                        }
                    });
                } catch(err) {
                    utils.log(constants.log.ERROR, 'Error inserting in DB: ' + err);
                }
            }
        };

    return {
        connect: connect,
        insertIntoDB: insertIntoDB
    }
}();

module.exports = mysql;