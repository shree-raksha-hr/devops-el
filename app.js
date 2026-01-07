const http = require('http')

const server = http.createServer((req, res) => {
    const headers = {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
    }

    if (req.method === 'OPTIONS') {
        res.writeHead(204, headers)
        return res.end()
    }

    if (req.url === '/health') {
        res.writeHead(200, headers)
        return res.end('OK from v2(green)!')
    }

    if (req.url === '/api/status') {
        res.writeHead(400, headers)
        return res.end('Not found! - Bug in v2')
    }

    res.writeHead(200, headers)
    res.end(`Hello from Blue-Green Demo v2! Time: ${new Date()}`)
})

server.listen(3000, () => console.log('v2 running on port 3000'))
