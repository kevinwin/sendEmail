var configPath = './../../.env';
require('env2')(configPath);

var api_key = process.env.MAILGUN_API_KEY;
var domain = process.env.MAILGUN_DOMAIN;
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

module.exports = mailgun;
 
// var data = {
//   from: 'Excited User <me@samples.mailgun.org>',
//   to: 'mail@kevinwin.com',
//   subject: 'Hello World!',
//   text: 'Testing some Mailgun awesomness AGAIN!'
// };
 
// mailgun.messages().send(data, function (error, body) {
//   if (error) {
//     console.error(error);
//   }
//   console.log(body);
// });
