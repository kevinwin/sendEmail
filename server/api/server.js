var cluster = require('cluster');

if (cluster.isMaster) {
  // Count the machine's CPUs
  var cpuCount = require('os').cpus().length;

  // Create a worker for each CPU
  for (var i = 0; i < cpuCount; i += 1) {
    cluster.fork();
  }

  // Respawn workers upon death
  cluster.on('exit', function (worker) {
    console.log('Worker %d died :(. Respawning...', worker.id);
    cluster.fork();
  });

} else {
  var app = require('./server-config.js');
  var port = process.env.PORT || 3000;

  app.listen(port, function() {
    console.log('API active. Worker # ', cluster.worker.id);
  });
}








