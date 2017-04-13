var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var Promise = require('bluebird');
var configs = require(__dirname + '/config.json');
var env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
var config = configs[env];

var models = require('./models');
var { router, middlewares } = require('jsonapi-express-backend')(__dirname, config, models);
 // var { router, middlewares } = require('../jsonapi-reference')(__dirname, config, models);

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

app.post('/send-message', (req, res) => {
  const nodemailer = require('nodemailer');
  let transporter = nodemailer.createTransport({
    service: 'Mailgun',
    auth: {
      user: config.email.mailgunLogin,
      pass: config.email.mailgunPass
    }
  });

  const from = 'postmaster@ember-blog.info';
  const replyTo = req.body.name + ' <' + req.body.email + '>';
  const to = config.email.adminEmail;
  const subject = 'Message from ' + replyTo;
  const text = req.body.message;
  const html = req.body.message.replace(/[\n\r]/g, '<br>');
  // setup email data with unicode symbols
  let mailOptions = { from, to, replyTo, subject, text, html };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return res.status(500).send(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
      const { messageId, response } = info;
      return res.json({ mailOptions, messageId, response });
  });

  // return res.json(req.body);
});

app.listen(port, function () {
  console.log('Example app listening on port ' + port);
});
