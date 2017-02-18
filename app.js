'use strict';

const express = require('express'),
	  bodyParser = require("body-parser");

const events = require('./lib/events');

const app = express();

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

app.get('/test', (req, res) => {
    res.send('Magnus is running');
});

let queue = [],
	floors = 20,
	atFloor = 0,
	moving = false;

app.get('/getevents', (req, res) => {
	res.json(events);
});

app.get('/getqueue', (req, res) => {
	res.json(queue);
});

app.listen(8081);
