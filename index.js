/*
  Primary file for API
*/

// Dependencies
const http = require('http');
const url = require('url');
const { StringDecoder } = require('string_decoder');

// Create a Server
const server = http.createServer((req, res) => {

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

    // send the response
    res.end('Hello World\n');
  
    // log the request path
    console.log(`Request received with payload : ${buffer}`);
  });
 
});

// Start listening
server.listen(3000, () => {
  console.log('Server is running on port 3000');
  console.log(`localhost:${3000}`);
});