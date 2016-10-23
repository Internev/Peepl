'use strict'

var http = require('http');
var employeeService = require('./lib/employees');
var responder = require('./lib/responseGenerator');
var staticFile = responder.staticFile('/public');


http.createServer(function(req, res) {
  var _url;

  req.method = req.method.toUpperCase();
  console.log(req.method, req.url);

  if (req.method !== 'GET') {
    res.writeHead(501, {
      'Content-Type': 'text/plain'
    });
    return res.end(`${req.method} is not supported by this server.`);
  }

  //assigns _url the value of '/employees' if found in req.url. Interesting pattern...
  if (_url = /^\/employees$/i.exec(req.url)) {
    //return list of employees
    employeeService.getEmployees((err, data) => {
      if (err) {
        //send 500 err.
        return responder.send500(err, res);
      }
      //send data with a 200 status code.
      return responder.sendJson(data, res);
    });
  }
  // as above. Note that grouping \d makes it a new item in the _url object. Whole url is still first item though. _url object has whole thing, then grouped bit, then some additional stuff inc index and whole input.
  else if (_url = /^\/employees\/(\d+)$/i.exec(req.url)) {
    //find the employee by id in the route.
    employeeService.getEmployee(_url[1], (err, data) => {
      if (err) {
        //send 500 error.
        return responder.send500(err, res);
      }
      if (!data) {
        //send 404.
        return responder.send404(res);
      }
      //send data + 200 status.
      return responder.sendJson(data, res);
    });
  } else { //default case. Replace with static file/404.
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    res.write(`The current time is ${Date.now()}`)
    res.end('<h1>We did it</h1>');
  }
}).listen(1337, 'localhost');

console.log("Shard up and listening on localhost:1337");
