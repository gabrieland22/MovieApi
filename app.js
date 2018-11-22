var express = require('express');
var app = express();
var bodyParser = require('body-parser');


//C:\Users\1080191\AppData\Roaming\npm\pm2 start app.js --watch
//1px base64: R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=

var port = process.env.PORT || 3000;

app.listen( port, function() {
	'use strict';
	console.log( 'Listening on port ' + port );
} );

//midleware
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

//controllers
var actorCtrl = require('./server/controllers/actor.js')
var movieCtrl = require('./server/controllers/movie.js')

//router

app.get('/', function(req, res) {
  res.send('server is running!',200);
});


// Movie endpoints
app.get('/movies', function(req, res) {
	movieCtrl.readAll(function(resp) {
		res.status(resp.statusCode).json(resp);
	  });
	});

  app.route('/movie/:id').get(function(req, res) {
		var id = req.params["id"];
		movieCtrl.readFromID(id, function(resp) {
				res.status(resp.statusCode).json(resp);
			});
	});

	app.delete('/movie/:id', function(req, res) {
		var id = req.params["id"];
		movieCtrl.deleteFromID(id, function(resp) {
			res.status(resp.statusCode).json(resp);
		  });
	});
	
	app.put('/movie/:id', function(req, res) {
		var id = req.params["id"];
		var body = req.body;
		movieCtrl.edit(id, body, function(resp) {
			res.status(resp.statusCode).json(resp);
		  });
	});
	
	app.post('/movie', function(req, res) {
		var body = req.body;
		movieCtrl.insert(body, function(resp){
			res.status(resp.statusCode).json(resp)
		});
	});

// Actors endpoints

  app.get('/actors', function(req, res) {
	actorCtrl.readAll(function(resp) {
    res.status(resp.statusCode).json(resp);
  });
});

app.get('/actor/:id', function(req, res) {
	var id = req.params["id"];
	actorCtrl.readFromID(id, function(resp) {
    	res.status(resp.statusCode).json(resp);
  	});
});

app.delete('/actor/:id', function(req, res) {
	var id = req.params["id"];
	actorCtrl.deleteFromID(id, function(resp) {
    	res.status(resp.statusCode).json(resp);
  	});
});

app.put('/actor/:id', function(req, res) {
	var id = req.params["id"];
	var body = req.body;
	actorCtrl.edit(id, body, function(resp) {
    	res.status(resp.statusCode).json(resp);
  	});
});

app.post('/actor', function(req, res) {
	var body = req.body;
	actorCtrl.insert(body, function(resp){
		res.status(resp.statusCode).json(resp)
	});
});

// Login endpoint

app.post('/auth/signin/fb', function (req, res) {
	 var request = require("request"); 
	 var fbURL = 'https://graph.facebook.com/me'; 
	 var actions = '&fields=name,email,id,picture'; 
	 var fbToken = req.body.fbToken; 
	 var url = fbURL + '?access_token=' + fbToken + actions; 
	 var options = {
				 url:url, 
				 method:'GET',
				 contentType: 'application/json'
				 }
	request(options, function (error, response, body) {
		 if (response.statusCode != 200) {
			  res.status(response.statusCode).json({ 
					'statusCode':response.statusCode, 
					'result': { 'message':'Não foi possível logar com o Facebook'}
				}) 
					res.status(400).send(req.body)
				}else{
					var json = JSON.parse(body);
					console.log(json);

					res.status(200).json({
						'statusCode':200,
						'result' : {
							'name' : json.name,
							'email' : json.email,
							'picture' : json.picture
						}
					})
				}     
				}); 
		}); 
