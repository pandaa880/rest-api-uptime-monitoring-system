/*
  Primary file for API
*/

// Dependencies
const http = require('http');
const https = require('https');
const url = require('url');
const fs = require('fs');
const { StringDecoder } = require('string_decoder');

const config = require('./config');

// Instantiate the HTTP server
const httpServer = http.createServer((req, res) => unifiedServer(req, res));
;
// Start the HTTP server
httpServer.listen(config.httpPort, () => {
  console.log(`Server is running in ${config.envName} mode on port ${config.httpPort}`);
});

// HTTPS server options
const httpsServerOptions = {
  key: fs.readFileSync('./https/key.pem'),
  cert: fs.readFileSync('./https/cert.pem')
};

// Instantiate the HTTPS server
const httpsServer = https.createServer(httpsServerOptions, (req, res) => unifiedServer(req, res));

// Start the HTTPs server
httpsServer.listen(config.httpsPort, () => {
  console.log(`Server is running in ${config.envName} mode on port ${config.httpsPort}`);
});

// All the server logic for http & https
const unifiedServer = (req, res) => {
  // get the URL and parse it
  const parsedURL = url.parse(req.url, true);
    
  // get the path
  /*
  * * The Regex in .replace method means that, look for one or more slash symbol at the start of the string and at the end of the string and then replace them with empty string.
  */
  const path = parsedURL.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, '');

  // get the questString as an object
  let queryStringObject = parsedURL.query;

  // get the http method
  const method = req.method.toUpperCase();

  // get the headers as an object
  const headers = req.headers;

  // get the payload if there is any
  const decoder = new StringDecoder('utf-8');
  let buffer = '';

  req.on('data', (data) => buffer += decoder.write(data));

  req.on('end', () => {
    buffer += decoder.end();

    // choose the handler this request is go to. If not found then call not found handler
    const chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

    // construct the data object to send to the handler
    const data = {
      trimmedPath,
      queryStringObject,
      method,
      headers,
      payload: buffer
    }

    // route the request to the handler specified in the router
    chosenHandler(data, (statusCode = 200, payload = {}) => {
      // convert the payload to a string
      const payloadString = JSON.stringify(payload);
    
      // return the response
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(statusCode);
      res.end(payloadString);

      // log the request path
      console.log(`Returing this response : ${statusCode} and ${payloadString}`);
    });
  });
}

// Define the handlers
const handlers = {};

// Ping Handler
handlers.ping = (data, callback) => {
  callback(200);
}

// not found handler
handlers.notFound = (data, callback) => {
  // callback a http status code, and a payload object  
  callback(404);
};

// Define a request router
const router = {
  ping: handlers.ping
}