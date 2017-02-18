'use strict';

const express = require('express'),
	  bodyParser = require("body-parser");

const app = express();

let queue = [],
	floors = 20,
	atFloor = 0,
	moving = {
        value: false
    },
    waiting = {
        value: false
    },
    transit = {
        value: false
    },
	start = Math.floor(Date.now() / 1000);

let pi= "";

let events = require('./lib/events');

setInterval(() => {
	console.log(queue, atFloor);
	require('./lib/scheduler')(start, queue, atFloor, moving, waiting, transit);
}, 1000);

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

app.get('/test', require('./lib/controllers')(events, queue, moving, atFloor, pi).test);

app.get('/getevents', require('./lib/controllers')(events, queue, moving, atFloor, pi).getevents);

app.get('/getqueue', require('./lib/controllers')(events, queue, moving, atFloor, pi).getqueue);

app.post('/emergency', require('./lib/controllers')(events, queue, moving, atFloor, pi).emergency);

app.post('/approaching', require('./lib/controllers')(events, queue, moving, atFloor, pi).approaching);

app.post('/pi', require('./lib/controllers')(events, queue, moving, atFloor, pi).postpi);

app.get('/pi', require('./lib/controllers')(events, queue, moving, atFloor, pi).getpi);

app.listen(8081);
