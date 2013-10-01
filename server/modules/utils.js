var constants = require('./constants');

/*
 * Logging method
 * */
module.exports = {
    log: function(logLevel, text) {
        var logDate = new Date().toString().replace(/G.*/,'').replace(/[a-zA-Z]*\ /,'');
        var logMessage = logDate+'- '+text;

        switch(logLevel) {
            case constants.log.INFO :
                console.info(logMessage);
                break;
            case constants.log.WARNING :
                console.warn(logMessage);
                break;
            case constants.log.ERROR :
                console.error(logMessage);
                break;
            default :
                console.log(logMessage);
        }
    },

    throwError: function(text) {
        throw new Error(text);
    },

    escapeString: function(str) {
        return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
            switch (char) {
                case "\0":
                    return "\\0";
                case "\x08":
                    return "\\b";
                case "\x09":
                    return "\\t";
                case "\x1a":
                    return "\\z";
                case "\n":
                    return "\\n";
                case "\r":
                    return "\\r";
                case "\"":
                case "'":
                case "\\":
                case "%":
                    return "\\"+char; // prepends a backslash to backslash, percent,
                // and double/single quotes
            }
        });
    }
};
