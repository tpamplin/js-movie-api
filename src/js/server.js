const http = require("http"),
    fs = require("fs"),
    url = require("url");

http.createServer((request, response) => {
    let addr = request.url,
        q = new URL(addr, "http://localhost:8080"),
        filePath = "";

    if (q.pathname.includes("documentation")) {
    }
}).listen(8080);

console.log("My first Node test server ios running on port 8080.");
