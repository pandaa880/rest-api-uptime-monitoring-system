/*
  Primary file for API
*/

// Dependencies
const http = require('http');

// Create a Server
const server = http.createServer((req, res) => res.end("Hello World\n"));

// Start listening
server.listen(3000, () => {
  console.log('Server is running on port 3000');
  console.log(`localhost:${3000}`);
});