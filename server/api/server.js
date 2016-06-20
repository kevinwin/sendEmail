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

  app.post('/send', function(req, res) {
    if (req.body) {
      console.log('The request body is : ', req.body);
      var data = {
        from: req.body.user_mail || '',
        to: req.body.target_user_mail || '',
        subject: req.body.subject || '',
        text: req.body.message || ''
      };

      // Send email via postmark
      // postmark.sendEmail({
      //         "From": "mail@kevinwin.com",
      //         "To": "mail@kevinwin.com",
      //         "Subject": "Hello World!", 
      //         "TextBody": req.body.user_message
      //     }, function(error, success) {
      //         if(error) {
      //             console.error("Unable to send via postmark: " + error.message);
      //             return;
      //         }
      //         console.info("Sent to postmark for delivery");
      //     });

      mailgun.messages().send(data, function (error, body) {
        error = true;
        if (error) {
          console.error(error);
        }
        console.log(body);
      });
    }
    res.redirect('http://localhost:8000');
  });

  app.listen(port, function() {
    console.log('API active. Worker # ', cluster.worker.id);
  });
}








