const http = require('http');

// Create a server object
const server = http.createServer((req, res) => {
  // Set the response HTTP header with HTTP status and Content type
  res.writeHead(200, {'Content-Type': 'text/plain'});

  // Send the response body "Hello, world!"
  res.end('Hello, world!\n');
});

// Define the port the server will listen on
const PORT = process.env.PORT || 3000;

// Make the server listen on the defined port
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
