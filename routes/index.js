var express = require('express');
var router = express.Router();
var os = require('os');

router.get('/', function(req, res) {

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

	res.render('index', { 
		title: 'Skel',
		remoteAddress: req.connection.remoteAddress,
		localAddress: addresses
	});
});

module.exports = router;
