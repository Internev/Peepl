'use strict'

var fs = require('fs');

//exports
exports.send404 = send404;
exports.sendJson = sendJson;
exports.send500 = send500;
exports.staticFile = staticFile;

function send404(res) {
  console.error('Resource not found');

  res.writeHead(404, {
    'Content-Type': 'text/plain'
  });
  res.end('Not Found');
}

function sendJson(data, res) {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });
  res.end(JSON.stringify(data));
}

function send500(data, res) {
  console.error(data.red);

  res.writeHead(500, {
    'Content-Type': 'text/plain'
  });
  res.end(data);
}

function staticFile(staticPath) {
  return (data, res) => {
    let readStream;

    //Make it so routes to /home and /home.html both work.
    data = data.replace(/^(\/home)(.html)?$/i, '$1.html');
    data = '.' + staticPath + data;

    fs.stat(data, (err, stats) => {
      if (err || stats.isDirectory()) {
        return exports.send404(res);
      }

      readStream = fs.createReadStream(data);
      return readStream.pipe(res);
    });
  }
}
