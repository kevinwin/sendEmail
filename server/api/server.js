var cluster = require('cluster');

if (cluster.isMaster) {
  // Count the machine's CPUs
  var cpuCount = require('os').cpus().length;

  // Create a worker for each CPU
  for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }

} else {
  var express = require('express');
  var bodyParser = require('body-parser');
  var mailgun = require('./mailgun-config.js');
  var postmark = require('./postmark-config.js');
  
  var port = process.env.PORT || 3000;

  var app = express();
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.post('/send', function(req, res) {
    if (req.body) {
      var data = {
        from: req.body.user_mail || '',
        to: req.body.target_user_mail || '',
        subject: req.body.subject || '',
        text: req.body.message || ''
      };


      mailgun.messages().send(data, function (error, body) {
        if (error) {
          console.error('Error: %d\n Trying Postmark', error);
          // Send email via postmark
          postmark.sendEmail({
                  "From": "mail@kevinwin.com", // Postmark doesn't allow for spoofing
                  "To": req.body.target_user_mail,
                  "Subject": req.body.subject, 
                  "TextBody": req.body.message
              }, function(error, success) {
                  if(error) {
                      console.error("Unable to send via postmark: " + error.message);
                      return;
                  }
                  console.info("Sent to postmark for delivery");
              });
        }
        console.log(body);
        res.end('');
      });
    }
  });

  app.listen(port, function() {
    console.log('API active. Worker # ', cluster.worker.id);
  });
}








