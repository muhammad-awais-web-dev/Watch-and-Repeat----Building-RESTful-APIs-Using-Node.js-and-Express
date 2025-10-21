const http = require('http');
const port = 5000;
const todos = require('./todos');
const {getRequestData} = require('./utils');

const server = http.createServer( async (request, response) => {
    const path = (request.url || '').split('?')[0];
    if (path === '/api/v1/todos' && request.method === 'GET') {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        return response.end(JSON.stringify(todos));
    }
    else if (path === '/api/v1/todos' && request.method === 'POST') {
        let req_data = await getRequestData(request);
        todos.push(JSON.parse(req_data));
        response.writeHead(201, { 'Content-Type': 'application/json' });
        return response.end(JSON.stringify({ message: 'Todo added successfully' }));
    }
    else if (request.url.match(/\/api\/v1\/todos\/([0-9]+)/) && request.method === 'DELETE') {
        const id = parseInt(request.url.split('/')[4]);
        const todo = todos.find(t => t.id === id);
        if (!todo) {
            response.writeHead(404, { 'Content-Type': 'application/json' });
            return response.end(JSON.stringify({ message: 'Todo not found' }));
        }
        else {
            const index = todos.indexOf(todo);
            todos.splice(index, 1);
            response.writeHead(200, { 'Content-Type': 'application/json' });
            return response.end(JSON.stringify({ message: 'Todo deleted successfully' }));
        }
    }

    // Default 404 for unmatched routes to avoid hanging requests
    response.writeHead(404, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ message: 'Route not found' }));
})

server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}/`);
    console.log(`To get todos, navigate to http://localhost:${port}/api/v1/todos`);
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${port} is already in use. Please choose another port.`);
    }
});