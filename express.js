var express = require('express');

var app = express();

//manipulate url
app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('You\'re in reception');
});

app.get('/basement', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('You\’re in the wine cellar. Those bottles are mine!');
});

//dynamic url
app.get('/floor/:floornum/bedroom', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('You\’re in the bedroom on floor n°' + req.params.floornum);
});

app.listen(8080);