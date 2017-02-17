'use strict';

const express = require('express'),
	  bodyParser = require("body-parser");

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

app.get('/', (req, res) => {
    res.send('Magnus is running');
});

app.listen(8081);
