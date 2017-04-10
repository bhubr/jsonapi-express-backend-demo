var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var Promise = require('bluebird');
var configs = require(__dirname + '/config.json');
var env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
var config = configs[env];

var relationships = require('./relationships');
var { router, middlewares } = require('jsonapi-express-backend')(__dirname, config, relationships);

var port = process.argv.length >= 3 ? parseInt( process.argv[2], 10 ) : 3002;

/**
 * Setup Express
 */
var app = express();
app.use(express.static('public'));
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(middlewares.checkJwt);
app.use(middlewares.jsonApi);
app.use('/api/v1', router);

app.listen(port, function () {
  console.log('Example app listening on port ' + port);
});
