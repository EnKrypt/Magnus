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

app.get('/test', require('./lib/controllers')(events, queue, pi).test);

app.get('/getevents', require('./lib/controllers')(events, queue, pi).getevents);

app.get('/getqueue', require('./lib/controllers')(events, queue, pi).getqueue);

app.post('/pi', require('./lib/controllers')(events, queue, pi).postpi);

app.get('/pi', require('./lib/controllers')(events, queue, pi).getpi);

app.listen(8081);
