'use strict';

const express = require('express'),
	  bodyParser = require("body-parser");

const app = express();

let queue = [],
	floors = 20,
	atFloor = 0,
	moving = false;

let pi= ""

let scheduler = require('./lib/scheduler'),
	events = require('./lib/events');
let controllers = require('./lib/controllers')(events);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
	res.set({
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET, POST'
	});

	next();
});

app.get('/test', controllers.test);

app.get('/getevents', controllers.getevents);

app.get('/getqueue', controllers.getqueue);

app.post('/pi', controllers.postpi);

app.get('/pi', controllers.getpi);

app.listen(8081);
