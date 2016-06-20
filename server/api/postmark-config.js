// Send an email with the Postmark.js library 
// Learn more -> http://developer.postmarkapp.com/developer-official-libs.html#node

// Install with npm
// npm install postmark --save

var configPath = './../../.env';
require('env2')(configPath);

// Require
var postmark = require("postmark");

// Init postmark client
var client = new postmark.Client(process.env.POSTMARK_SERVER_TOKEN);

module.exports = client;

// client.sendEmail({
//     "From": "mail@kevinwin.com",
//     "To": "mail@kevinwin.com",
//     "Subject": "Hello World DOS!", 
//     "TextBody": "Hello World from Postmark AGAIN WITH ENV VARIABLES!"
// }, function(error, success) {
//     if(error) {
//         console.error("Unable to send via postmark: " + error.message);
//         return;
//     }
//     console.info("Sent to postmark for delivery");
// });
