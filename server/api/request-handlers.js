var mailgun = require('./mailgun-config.js');
var postmark = require('./postmark-config.js');

exports.send = function(req, res) {
  if (req.body) {
    var data = {
      from: req.body.user_mail || '',
      to: req.body.target_user_mail || '',
      subject: req.body.subject || '',
      text: req.body.message || ''
    };

    mailgun.messages().send(data, function(error, body) {
      if (error) {
        console.error('Error: %d\n Trying Postmark', error);

        // Send email via postmark
        postmark.sendEmail({
          "From": "mail@kevinwin.com", // Postmark doesn't allow for spoofing
          "To": req.body.target_user_mail,
          "Subject": req.body.subject,
          "TextBody": req.body.message
        }, function(error, success) {
          if (error) {
            console.error("Unable to send via postmark: " + error.message);
            return;
          }
          console.log("Sent to postmark for delivery");
        });
      }
      res.end('');
    });
  }
};

