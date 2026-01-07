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
        return res.end('OK from v1!')
    }

    if (req.url === '/api/status') {
        res.writeHead(200, headers)
        return res.end('Status OK from v1')
    }

    res.writeHead(200, headers)
    res.end(`Hello from Blue-Green Demo v3! Time: ${new Date()}`)
})

server.listen(3000, () => console.log('v3 running on port 3000'))
