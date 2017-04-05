var http  = require('http');
var expressServer = require('./app/ExpressServer.js');



function normalizePort(val) {
  var port = parseInt(val, 10);
  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

var app = new expressServer();
var server = http.createServer(app.expressServer);
var port = process.env.PORT || 10000;
server.listen(port, function () {
  console.log('escuchando el puerto.. : ' + port);
});
