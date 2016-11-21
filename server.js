var http = require('http')
var url = require('url')
var querystring = require('querystring');

//1. simple
var server = http.createServer(function(req,res){
	res.writeHead(401);	//status
	res.end('Hi');
});


//2. HTTP content
var server = http.createServer(function(req, res){
	res.writeHead(200, {"Content-Type": "text/html"});
	res.end('<p>Paragrah <strong>HTML</strong></p>')
});

// 3. url 
// http://localhost:8080/testpage
// http://localhost:8080/a/long/path
// http://localhost:8080/boguspage.html
var server = http.createServer(function(req, res) {
	var page = url.parse(req.url).pathname;
	console.log(page);
	res.writeHead(200, {"Content-Type": "text/plain"});
	if (page == '/a') {
		res.write('You\'re at the reception desk. How can I help you?');
	}
	else if (page == '/floor/1/bedroom') {
		res.write('Hey, this is a private area!');
	}
	res.end();
});


//4. url parameter: using queryString
//http://localhost:8080/whatever?firstname=a&&lastname=b
var server = http.createServer(function(req, res) {
	var params = querystring.parse(url.parse(req.url).query);
	res.writeHead(200, {"Content-Type": "text/plain"});
	if('firstname' in params && 'lastname' in params) {
		res.write('Your name is ' + params['firstname'] + ' ' + params['lastname']);
	}
	else{
		res.write('You do have a first name and a last name, don\'t you?');
	}
	res.end();
});

server.listen(8080);