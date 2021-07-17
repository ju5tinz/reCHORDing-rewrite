require('dotenv').config();

const express = require('express');
const http = require('http');

const app = express();

require('./config/express')(app);
require('./config/mongoose')();
require('./config/routes')(app);

var port = process.env.PORT || 3001;
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
