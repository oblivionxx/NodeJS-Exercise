var fs = require('fs')
var http = require('http')

var path = './front.html'
var server = http.createServer(function(req,res){
	res.setHeader('content-type', 'text/html');
	res.write(fs.readFileSync(path));
	res.end();
});

server.listen(8080);