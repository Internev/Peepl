'use strict'

var http = require('http');

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
        console.log(`We assigned url to ${_url}`);
        res.writeHead(200);
        return res.end('employee list');
    }
    // as above. Note that grouping \d makes it a new item in the _url object. Whole url is still first item though.
    else if (_url = /^\/employees\/(\d+)$/i.exec(req.url)) {
        res.writeHead(200);
        return res.end(`a single employee, url is ${_url[1]}`);
    } else {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.write(`The current time is ${Date.now()}`)
        res.end('<h1>We did it</h1>');
    }
}).listen(1337, 'localhost');

console.log("Shard up and listening on localhost");
