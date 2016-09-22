var express = require('express');
var router = express.Router();
var os = require('os');
var fs = require('fs');

function logHeader(header) {
  fs.appendFile('/home/james/access.log', header, function(err) {
    if (err ) console.log("error");
  });
}

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

	var remoteAddress = req.header('x-forwarded-for') || req.connection.remoteAddress;
	var header = JSON.stringify(req.headers);

	logHeader(header);

	res.render('index', { 
		title: 'Skel',
        url: req.url,
		remoteAddress: remoteAddress,
		localAddress: addresses,
		header: header
	});
});

module.exports = router;
