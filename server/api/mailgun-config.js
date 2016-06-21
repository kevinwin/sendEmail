var configPath = './../../.env';
require('env2')(configPath);

var api_key = process.env.MAILGUN_API_KEY;
var domain = process.env.MAILGUN_DOMAIN;
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

module.exports = mailgun;
