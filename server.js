var http = require("http");
var fs = require('fs');
var url = require("url");
var bodyparser = require('body-parser');

function start() {
	http.createServer(function(req, res) {
		var path = req.url;

		console.log("Request for " + path + " received");
		var fileName = ("./data" + path + ".json");
		console.log(fileName);
		if(req.method === "GET") {
			fs.readFile(fileName, function(error, content) {
				if(error) {
					res.writeHead(500);
					res.end()
				} else {
					res.writeHead(200, {"Content-Type": 'application/json'});
					res.end(content, "utf-8");
				}
			});
		} else if (req.method === "POST") {
			var body = " "
			req.on('data', function(data) {
				body += data.toString("utf-8");
			});
			req.on('end', function() {


			fs.writeFile(fileName, function(error, content) {
				if(error) {
					console.log("encountered error");
				}
					res.writeHead(200, {"Content-Type": "application/json"});
					res.end("Success");

				});
			res.end();
		});

		} else if (req.method === "PUT") {

		} else if (req.method === "PATCH") {

		} else if (req.method === "DELETE") {

		}
		// else {
		// 	res.writeHead(404, {"Content-Type": "text/html"});
		// 	res.end("<html><body><p> File not found</p></body></html>");
		// }
	}).listen(3000);
	console.log("Server has started");
}

exports.start = start;