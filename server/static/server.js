var express = require('express');
var app = express();
var port = process.env.PORT || 8000;

app.use('/', express.static(__dirname + '/../../client'));

app.listen(port, function() {
  console.log('Serving static files. Listening on port ', port);
})
