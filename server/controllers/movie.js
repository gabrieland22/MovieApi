var database = require('../util/databaseHelper.js');
var response = require('../util/responseHelper.js');

var MovieCtrl = {};
module.exports = MovieCtrl;

MovieCtrl.readFromID = function(id, callback){
  var sql = 'select id, title, photo_url AS photoURL, released_date AS releasedAt FROM Movie WHERE id = ?';
  var params = [id];
  console.log("id = ", id);

  database.query(sql, params, 'release', function(err, rows) {
    if (!rows || rows.length == 0){
      callback(response.result(400));
      return;
    }

    return callback(response.result(200, rows[0]));
  });
};


//GET /movies - lista todos os filmes
MovieCtrl.readAll = function(callback){

  var sql = 'select id, title FROM Movie';
  var params = null;

  database.query(sql, params, 'release', function(err, rows) {
    if (!rows || rows.length == 0){
      callback(response.result(400));
      return;
    }

    return callback(response.result(200, rows));
  });
};

//POST /actor - insere um novo filme
MovieCtrl.insert = function(params, callback){
  var imageName = params.name.fileNameClean('.jpg');
  base64.decode(params.photo, './public/images/' + imageName, function(err, output) {
    console.log("success")
  });
  
  var sql = 'INSERT INTO Movie(title, photo_url, released_date) VALUES(?,?,?)';
  var params = [params.name, imageName, true, false];

  database.query(sql, params, 'release', function(err, rows) {
    if (err) {
      callback(response.error(400, err));
      return;
    }
    
    var id = rows.insertId;
    MovieCtrl.readFromID(id, callback);
  });
};

//PUT /movie - altera um filme
MovieCtrl.edit = function(id, params, callback){
  var imageName = params.name.fileNameClean('.jpg');
  base64.decode(params.photo, './public/images/' + imageName, function(err, output) {
    console.log("success")
  });
  
  var sql = 'UPDATE Movie SET title = ?, photo_url = ?, released_date = ? WHERE id = ? ';
  var params = [params.name, imageName, id];

  database.query(sql, params, 'release', function(err, rows) {
    if (err) {
      callback(response.error(400, err));
      return;
    }
    
    MovieCtrl.readFromID(id, callback);
  });
};

//DELETE /actor - remove um ator
MovieCtrl.deleteFromID = function(id, callback){
  var sql = 'DELETE FROM Movie WHERE id = ? ';
  var params = [id];

  database.query(sql, params, 'release', function(err, rows) {
    if (err) {
      callback(response.error(400, err));
      return;
    }

    callback(response.result(204));
  });
};
