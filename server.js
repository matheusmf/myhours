var http = require('http');
var express = require('express');
var app = require('./config/express')();
require('./config/passport')();
var database = require('./config/database.js');
database('mongodb://localhost/myhours');

http.createServer(app).listen(app.get('port'), function() {
   console.log('Express Server escutando na porta ' + app.get('port')); 
});