/*
* Logging method
* */
exports.log = function(text) {
    var logDate = new Date().toString().replace(/G.*/,'').replace(/[a-zA-Z]*\ /,'');
    console.log(logDate+'- '+text);
};