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
      throw err;
     } else {
       console.log("Inserted a record");
         }  
       });
   }
   else {
     throw "error getting db connection object"
   } 
};

var logRequest = function(req, type) {
  var d = new Date();
  var logEntry = req.headers;
  var connection = req.connection;
  logEntry.remoteAddress = connection.remoteAddress;
  logEntry.date = d.toISOString();
  logEntry.type = type;
  logEntry.url = req.url;
  var colName = config.collection;
  insertDoc(logEntry);
};

router.get('/test', function(req, res) {
  res.sendStatus(200);
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

    if ( config.hasOwnProperty('showGreeting') && config.showGreeting === true ) {
    res.render('index', { 
      title: 'Skel',
          url: req.url,
      remoteAddress: remoteAddress,
      localAddress: addresses,
      header: header
    });
  } 
    else {
    res.sendStatus(200);
  }

});

router.post('/*', function(req, res) {
  logRequest(req, 'POST');
  res.sendStatus(403);
});

router.put('/*', function(req, res) {
  logRequest(req, 'PUT'); 
  res.sendStatus(403);
});

router.head('/*', function(req, res) {
  logRequest(req, 'HEAD');
  res.sendStatus(200);
});

router.delete('/*', function(req, res) {
  logRequest(req, 'DELETE');
  res.sendStatus(403);
});


module.exports = router;
