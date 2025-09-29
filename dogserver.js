const fs = require('fs');
const http = require('http');
const url = require('url');
const path = require('path');
const port = process.env.PORT ||8080;
const base_path = `${__dirname}`;
const index = "dogs.html"

fs.readFile(path.join(base_path, index), function (error, data) {
    if (error) {
        console.log(error);
    }
    const server = http.createServer(function (request, response) {
        const parsedUrl = url.parse(request.url, true);
        const pathname = parsedUrl.pathname;
        if (pathname === '/' || pathname === '/overview') {
            response.writeHead(200, { 'Content-type': 'text/html' });
            response.end(data);
        } else {
            let contentType;
            const path_end = path.join(base_path, pathname);
            fs.readFile(path_end, function (error, data) {
                if (error) {
                    return error;
                }
                const ext = path.extname(path_end);
                if (ext === '.css') contentType = "text/css";
                if (ext === '.js') contentType = "application/javascript";
                if (ext === '.png') contentType = "image/png";
                if (ext === '.jpg') contentType = "image/jpg";
                if (ext === '.jpeg') contentType = "image/jpeg";
                if (ext === '.html') contentType = "text/html";
                response.writeHead(200, { 'Content-type': contentType });
                response.end(data);
            })
        }
    })
    server.listen(port, function () {
        console.log('Server running');
    })

})
