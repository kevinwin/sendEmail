// SAMPLE
// Replace with your own config values

var plan = require('flightplan');

var appName = 'APPNAME'; // This is what will appear on remote server
var username = 'deploy';
var startFileStatic = 'path/to/server';
var startFileAPI = 'path/to/server';

var tmpDir = appName+'-' + new Date().getTime();

// configuration
plan.target('staging', [
  // {
  //   host: '104.131.93.214',
  //   username: username,
  //   agent: process.env.SSH_AUTH_SOCK
  // }
]);

plan.target('production', [
  {
    host: '123.345.678.90',
    username: username,
    privateKey: '/path/to/.your/id_rsa_secret',
    agent: process.env.SSH_AUTH_SOCK
  }
//add in another server if you have more than one
// {
//   host: '104.131.93.216',
//   username: username,
//   agent: process.env.SSH_AUTH_SOCK
// }
]);

// run commands on localhost
plan.local(function(local) {
  // uncomment these if you need to run a build on your machine first
  // local.log('Run build');
  // local.exec('gulp build');

  local.log('Copy files to remote hosts');
  var filesToCopy = local.exec('git ls-files', {silent: true});
  // rsync files to all the destination's hosts
  local.transfer(filesToCopy, '/tmp/' + tmpDir);
  local.transfer('.env', '/tmp/' + tmpDir); // NOTE: Make sure you create your own .env file
});

// run commands on remote hosts (destinations)
plan.remote(function(remote) {
  remote.log('Move folder to root');
  remote.sudo('cp -R /tmp/' + tmpDir + ' ~', {user: username});
  remote.rm('-rf /tmp/' + tmpDir);

  remote.log('Install dependencies');
  remote.sudo('npm --production --prefix ~/' + tmpDir + ' install ~/' + tmpDir, {user: username});

  remote.log('Reload application');
  remote.sudo('ln -snf ~/' + tmpDir + ' ~/'+appName, {user: username});
  remote.exec('sudo restart node-app');
});
