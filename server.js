'use strict';

// Module dependencies.
var express = require('express'),
    path = require('path'),
    fs = require('fs');

var app = express();

// Connect to database
var db = require('./lib/db/mongo');

// Bootstrap models
var modelsPath = path.join(__dirname, 'lib/models');
fs.readdirSync(modelsPath).forEach(function (file) {
  require(modelsPath + '/' + file);
});

// Populate empty DB with dummy data
require('./lib/db/dummydata');

// Controllers
var api = require('./lib/controllers/api'),
    apiCustomers = require('./lib/controllers/customers'),
    apiTelephone = require('./lib/controllers/telephone'),
    apiMail = require('./lib/controllers/mail'),
    apiAddress = require('./lib/controllers/address');



// Express Configuration
app.configure(function(){
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
});

app.configure('development', function(){
  app.use(express.static(path.join(__dirname, '.tmp')));
  app.use(express.static(path.join(__dirname, 'app')));
  app.use(express.errorHandler());
});

app.configure('production', function(){
  app.use(express.favicon(path.join(__dirname, 'public/favicon.ico')));
  app.use(express.static(path.join(__dirname, 'public')));
});

// Routes
app.get('/api/awesomeThings', api.awesomeThings);
app.get('/api/customersList',apiCustomers.getCustomers);
app.get('/api/customer/:customerId',apiCustomers.getCustomer);
app.get('/api/telephone/add',apiTelephone.addTelephone);
app.post('/api/telephone/update',apiTelephone.updateTelephone);
//app.delete('/api/telephone/delete',apiTelephone.deleteTelephone);
app.put('/api/mail/add',apiMail.addMail);
app.post('/api/mail/update',apiMail.updateMail);
app.post('/api/mail/delete',apiMail.deleteMail);
app.put('/api/address/add',apiAddress.addAddress);
app.post('/api/address/update',apiAddress.updateAddress);
//app.delete('/api/address/delete',apiAddress.deleteAddress);

// Start server
var port = process.env.PORT || 7000;
app.listen(port, function () {
  console.log('Express server listening on port %d in %s mode', port, app.get('env'));
});
