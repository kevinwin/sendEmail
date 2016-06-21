var configPath = './../../.env';
require('env2')(configPath);

// Require
var postmark = require("postmark");

// Init postmark client
var client = new postmark.Client(process.env.POSTMARK_SERVER_TOKEN);

module.exports = client;

