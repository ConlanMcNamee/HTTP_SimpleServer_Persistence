var http = require("http");
var fs = require('fs');
var url = require("url");


function start() {
	http.createServer(function(req, res) {
		var path = req.url;

		console.log("Request for " + path + " received");
		var fileName = ("./data" + path + ".json");
		console.log(fileName);
		if(req.method === "GET") {
			if(req.url === "/") {
				res.writeHead(404);
				res.end("File not found");
			}
			fs.readFile(fileName, function(error, content) {
				if(error) {
					res.writeHead(404);
					res.end("<html><body><p>File not found</p></body></html>");
				} else {
					res.writeHead(200, {"Content-Type": 'application/json'});
					res.end(content, "utf-8");
				}
			});
		} else if (req.method === "POST") {
			console.log("post request received")
			//data is a parameter that req.on has
			req.on('data', function(data) {
				var body = data.toString();
				console.log("on",body);
				console.log("after",body);
				req.on('end', function() {
				fs.writeFile(fileName, body, function(error) {
					if(error) {
						console.log("encountered error");
					}
						res.writeHead(200, {"Content-Type": "application/json"});
						res.end('{"Success": "true"}');

				});
			});
			
			
		});

		} else if (req.method === "PUT") {
				console.log("put request received");
				req.on('data', function(data) {
					var body = data.toString('utf-8');
					console.log(body);
					var startObj = {
						username: JSON.parse(body).username || null,
						password: JSON.parse(body).password || null
					}
					console.log(startObj);

					// body = JSON.parse(body);
					fs.readdir('./data', function(err, files) {
						if(err) return res.send(404, + "File not found");
						console.log('data:', files);
						for (var i = 0; i < files.length; i++) {
							if("/" + files[i] === req.url + ".json") {
								fs.readFile(fileName, function(err, data) {
									var user = JSON.parse(data);
									var obj = {username: null, password: null};
									for (var prop in obj) {
										obj[prop] = (startObj[prop]) ? startObj[prop] : user[prop];
									}
									fs.writeFile(fileName, JSON.stringify(obj), function(err) {
										if(err) {
										console.log("encountered error");
										}
										res.writeHead(200, {"Content-Type": "application/json"});
										res.end('{"Success": "true"}');

									});
								});
							} 
						}
					});
			 	});
		} else if (req.method === "DELETE") {
			fs.unlink(fileName, function(err) {
				if (err) {
					res.writeHead(404, {"Content-Type": "text/html"});
					res.end("<html><body><p>File not found</p></body></html>");
				} else {
					res.writeHead(200, {"Content-Type": "application/json"});
					res.end('{"Deletion": "true"}');
				}
			});

		}
	}).listen(3000);
	console.log("Server has started");
}

exports.start = start;