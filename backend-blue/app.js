const http = require('http')

const server = http.createServer((req, res) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
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
        return res.end('OK from v1(Blue)!')
    }

    if (req.url === '/api/status') {
        res.writeHead(200, headers)
        return res.end('OK from v1')
    }

    res.writeHead(200, headers)
    res.end(`Hello from Blue-Green Demo v1! Time: ${new Date()}`)
})

server.listen(3000, () => console.log('v1 running on port 3000'))
