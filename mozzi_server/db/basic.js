
var mysql      = require('mysql');
var pool = mysql.createPool({
    connectionLimit  :  1000,
    host             : 'localhost',
    port             :  3306,
    user             : 'mozzi',
    password         : 'mozzi',
    database         : 'mozzidb'
});

var getConnection = function(callback){
    pool.getConnection(function(err,connection) {
        callback(err,connection);
    });
};
module.exports = getConnection;