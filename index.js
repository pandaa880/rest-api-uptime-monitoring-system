/*
  Primary file for API
*/

// Dependencies
const http = require('http');
const url = require('url');

// Create a Server
const server = http.createServer((req, res) => {

  // get the URL and parse it
  const parsedURL = url.parse(req.url, true);

  // get the path
  const path = parsedURL.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, '');

  // send the response
  res.end('Hello World\n');

  // log the request path
  console.log(`Request received on path : ${trimmedPath}`);
  
});

// Start listening
server.listen(3000, () => {
  console.log('Server is running on port 3000');
  console.log(`localhost:${3000}`);
});