/*global require __dirname */
const path = require('path');
const express = require('express');

const swagger = require('./swagger');
const services = require('./services');
const websockets = require('./websockets');

const port = 8080;

const source = 'src';

const serveAppFrom = path.resolve() + '/' + source;
const serveDocsFrom = path.resolve() + '/docs/';

const app = express();

app.use(express.json())

// start up backend services and swagger
services.start(app);
websockets.start(app);
swagger.start(app, port);

app.listen(port, () => {
  console.log('');
  console.log('Serving files from:');
  console.log(serveAppFrom);
});

app.use('/', function (req, res, next) {
  console.log(req.url);
  next();
});

app.use(express.static(serveAppFrom, { fallthrough: true }));
app.use(express.static(serveDocsFrom, { fallthrough: true }));

app.get('/', (req, res, next) => {
  next();
});