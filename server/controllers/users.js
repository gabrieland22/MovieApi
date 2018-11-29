require('../util/stringExtension.js');
var database = require('../util/databaseHelper.js');
var response = require('../util/responseHelper.js');
var base64 = require('file-base64');

var UserCtrl = {};
module.exports = UserCtrl;


//Procura um Usuario pelo Nome
UserCtrl.findFromNameUSR = function(name, callback){
  var sql = 'select id FROM Star WHERE  name = ?';
  var params = [name];


  database.query(sql, params, 'release', function(err, rows) {
    if (!rows || rows.length == 0){
      callback(response.result(400));
      return;
    }

    return callback(response.result(200, rows[0]));
  });
};
 
//Insere um novo Usuário
UserCtrl.insert = function(params, callback){
  var imageName = params.name.fileNameClean('.jpg');
  base64.decode(params.name, './public/images/' + imageName, function(err, output) {
    console.log("success")
  });
  
  var sql = 'INSERT INTO User(email ,fbToken, name, photo_url) VALUES(?,?,?,?)';
  var params = [params.email ,params.fbToken, params.name, imageName];

  database.query(sql, params, 'release', function(err, rows) {
    if (err) {
      callback(response.error(400, err));
      return;
    }
    
    var id = rows.insertId;
    UserCtrl.readFromID(id, callback);
  });
};

// Altera um usuário
UserCtrl.edit = function(id, params, callback){
  var imageName = params.name.fileNameClean('.jpg');
  base64.decode(params.name, './public/images/' + imageName, function(err, output) {
    console.log("success")
  });
  
  var sql = 'UPDATE User SET email = ?, fb_token = ?, name = ?, photo_url = ? WHERE id = ? ';
  var params = [params.email ,params.fbToken, params.name, imageName, id];

  database.query(sql, params, 'release', function(err, rows) {
    if (err) {
      callback(response.error(400, err));
      return;
    }
    
    UserCtrl.readFromID(id, callback);
  });
};


