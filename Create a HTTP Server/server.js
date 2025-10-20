const http = require('http');
const port = 5000;

const server = http.createServer((request, response) => {
    response.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    response.end('Hello, World!\n');
})

server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}/`);
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${port} is already in use. Please choose another port.`);
    }
});