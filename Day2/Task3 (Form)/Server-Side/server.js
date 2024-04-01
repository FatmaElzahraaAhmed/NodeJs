const http = require('http');
const fs = require('fs');

let mainHTML = "";
fs.readFile("../Client-Side/Pages/main.html", "utf-8", (err, data) => {
    if (err) {
        console.log("Error reading main.html");
    } else {
        mainHTML = data;
    }
});
let welcomeHTML = fs.readFileSync("../Client-Side/Pages/welcome.html", "utf-8");

let scriptJavaScript = fs.readFileSync("../Client-Side/Scripts/script.js", "utf-8");

let styleCSS = fs.readFileSync("../Client-Side/Styles/style.css", "utf-8");

let clients = [];
fs.readFileSync("../Client-Side/Assets/clients.json", "utf-8", (err, data) => {
    if (!err) {
        clients = JSON.parse(data);
    }
});

http.createServer((req, res) => {
    if (req.method === "GET") {
        switch (req.url) {
            case "/":
            case "/Pages/main.html":
            case "/main.html":
            case "/Client-Side/Pages/main.html":
                res.setHeader("Content-Type", "text/html");
                res.write(mainHTML);
                break;
            case "/welcome.html":
            case "/Client-Side/Pages/welcome.html":
            case "/Pages/welcome.html":
                res.setHeader("Content-Type", "text/html");
                res.write(welcomeHTML);
                break;
            case "/style.css":
            case "/Styles/style.css":
            case "/Client-Side/Styles/style.css":
                res.setHeader("Content-Type", "text/css");
                res.write(styleCSS);
                break;
            case "/script.js":
            case "/Scripts/script.js":
            case "/Client-Side/Scripts/script.js":
                res.setHeader("Content-Type", "text/javascript");
                res.write(scriptJavaScript);
                break;
            case "/clients.json":
            case "/Assets/clients.json":
            case "/Client-Side/Assets/clients.json":
                fs.readFile("../Client-Side/Assets/clients.json", "utf-8", (err, data) => {
                    if (err) {
                        console.error("Error reading clients data:", err);
                        res.writeHead(500, {'Content-Type': 'text/plain'});
                        res.end('Internal Server Error');
                        return;
                    }
                    try {
                        const clients = JSON.parse(data);
                        res.writeHead(200, {'Content-Type': 'application/json'});
                        res.end(JSON.stringify(clients));
                    } catch (error) {
                        console.error("Error parsing clients data:", error);
                        res.writeHead(500, {'Content-Type': 'text/plain'});
                        res.end('Internal Server Error');
                    }
                });
                return;
            default:
                res.writeHead(404, {'Content-Type': 'text/html'});
                res.end('404 Not Found');
                return;
        }
        res.end();
    } else if (req.method == "POST") {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const formData = new URLSearchParams(body);
            const name = formData.get('name');
            const mobile = formData.get('mobile');
            const addr = formData.get('addr');
            const email = formData.get('email');

            if (!name || !mobile || !addr || !email) {
                res.writeHead(400, {'Content-Type': 'text/plain'});
                res.end('All fields are required');
                return;
            }

            const clientData = {
                name,
                mobile,
                addr,
                email
            };
            clients.push(clientData);
            fs.writeFile('../Client-Side/Assets/clients.json', JSON.stringify(clients, null, 2), (err) => {
                if (err) {
                    console.error(err);
                    res.writeHead(500, {'Content-Type': 'text/plain'});
                    res.end('Internal Server Error');
                    return;
                }
                res.setHeader("Content-Type","text/html");
                let File = welcomeHTML.replace("{clientName}",name).replace("{mobile}",mobile).replace("{addr}",addr).replace("{email}",email);
                res.write(File);
                res.end();
            });
        });
    } else {
        res.writeHead(405, {'Content-Type': 'text/html'});
        res.end('Method Not Allowed');
        return;
    }
}).listen(7000, () => {
    console.log("Server running at http://localhost:7000");
});
