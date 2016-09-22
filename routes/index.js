var express = require('express');
var router = express.Router();
var os = require('os');
var fs = require('fs');
var db = require('../db');
var config = require('../config');

var insertDoc = function(doc) {
   var con = db.get()
   var col = config.collection;
   if ( con ) {
	   db.get().collection(col).insertOne(doc, function(err, result) {
		 if ( err ) {
			console.log("cannot write to db -- insertion error");
			console.log(err);
		 }
		 console.log("Inserted a record");
       });
   }
   else console.log("cannot write to db");
};

var logRequest = function(req, type) {
  var d = new Date();
  var logEntry = req.headers;
  var connection = req.connection;
  logEntry.xforwardedFor = req.headers['x-forwarded-for'];
  logEntry.remoteAddress = connection.remoteAddress;
  logEntry.date = d.toISOString();
  logEntry.type = type;
  logEntry.url = req.url;
  var colName = config.collection;
  insertDoc(logEntry);
};

router.get('/test', function(req, res) {
  res.send(200);
});

router.get('/*', function(req, res) {


	// thanks to:
	// http://stackoverflow.com/questions/10750303/how-can-i-get-the-local-ip-address-in-node-js
	var interfaces = os.networkInterfaces();
	var addresses = [];
	for (var k in interfaces) {
	    for (var k2 in interfaces[k]) {
	        var address = interfaces[k][k2];
	        if (address.family === 'IPv4' && !address.internal) {
	            addresses.push(address.address);
	        }
	    }
	}

	logRequest(req, 'GET');

	var header = JSON.stringify(req.headers);
	var remoteAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

	res.render('index', { 
		title: 'Skel',
        url: req.url,
		remoteAddress: remoteAddress,
		localAddress: addresses,
		header: header
	});
});

router.post('/', function(req, res) {
  logRequest(req, 'GET');
});

router.put('/', function(req, res) {
  logRequest(req.headers, req.connection, 'PUT'); 
});

router.head('/', function(req, res) {
  logRequest(req, 'GET');
});

router.delete('/', function(req, res) {
  logRequest(req, 'GET');
});


module.exports = router;
