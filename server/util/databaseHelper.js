var config = require('../../config.js');
var mysql = require('mysql');

var DatabaseHelper = {};
var currentPool;
module.exports = DatabaseHelper;

DatabaseHelper.pool = function(){
    return mysql.createPool(config.database);
};

DatabaseHelper.query = function(sql, params, releaseOrDestroy, callback){
  var pool;
  if (currentPool) {
    console.log('connection reuse');
  }else {
    currentPool = DatabaseHelper.pool();
    console.log('creating new connection');
  }
  pool = currentPool;

  pool.getConnection(function(err, connection) {
    sql = mysql.format(sql, params);
    if (sql.length < 200) console.log(sql);
		if (err){
      console.log(err);
      callback(err, null); return;
    }

    connection.query(sql, function(err, result, fields) {
      if(releaseOrDestroy == 'release'){
        connection.release();
      }else {
        connection.destroy();
        console.log('database connection destroied');
        // currentPool = null;
      }
      if (err){
        callback(err, null); return;
      }
      callback(null, result);
    });
  });
}
