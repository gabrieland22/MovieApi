require('../util/stringExtension.js');
var database = require('../util/databaseHelper.js');
var response = require('../util/responseHelper.js');
var base64 = require('file-base64');

var MovieCtrl = {};
module.exports = MovieCtrl;

MovieCtrl.readFromID = function(id, callback){
  var sql = ' SELECT movie.id, title, movie.photo_url AS photoURL, released_date AS releasedAt, lenght, star.id AS starId, star.name, star.photo_url AS startPhotoURL \
  FROM movie \
  LEFT JOIN starmovie ON starmovie.movie_id = movie.id \
  LEFT JOIN star ON starmovie.star_id = star.id \
  WHERE movie.id = ?';
  var params = [id];
  console.log("id = ", id);

  database.query(sql, params, 'release', function(err, rows) {
    if (err) {
      callback(response.error(400, err));
      return;
    }

    if (!rows || rows.length == 0) {
      callback(response.result(404));
      return;
    }

    var actors = [];
    for (var i = 0; i < rows.length; i++) {
      if (rows[i].starId) {
        actors.push({
          id: rows[i].starId,
          name: rows[i].name,
          photoURL: rows[i].startPhotoURL
        });
      }
    }

    var result = {
      id: rows[0].id,
      title: rows[0].title,
      photoURL: rows[0].photoURL,
      releasedAt: rows[0].releasedAt,
      lenght: rows[0].lenght,
      actors: actors
    };

    return callback(response.result(200, result));
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

    if (err) {
      callback(response.error(400, err));
      return;
    }

    if (!rows || rows.length == 0) {
      callback(response.result(404));
      return;
    }
  
    return callback(response.result(200, rows));
  });
};

//POST /actor - insere um novo filme
MovieCtrl.insert = function(params, callback){
  var imageName = params.title.fileNameClean('.jpg');
  base64.decode(params.photo_url, './public/images/' + imageName, function(err, output) {
    console.log("success")
  });
  
  var sql = 'INSERT INTO Movie(title, photo_url, lenght, released_date) VALUES(?,?,?,?)';
  var params = [params.title, imageName, params.lenght ,params.released_date];

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
  var imageName = params.title.fileNameClean('.jpg');
  base64.decode(params.photo_url, './public/images/' + imageName, function(err, output) {
    console.log("success")
  });
  
  var sql = 'UPDATE Movie SET title = ?, photo_url = ?, released_date = ? WHERE id = ? ';
  var params = [params.title, imageName, params.released_date, id];

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
