var express = require('express');
var session = require('cookie-session');
var parser = require('body-parser');	//retrieve info from table

var app = express();
var urlencodedParser = parser.urlencoded({ extended: false });

//user session
app.use(session({secret: 'todotopsecret'}))

//init. no todo in the list
.use(function(req, res, next){
    if (typeof(req.session.todolist) == 'undefined') {
        req.session.todolist = [];   
    }
    req.session.fullname = 'DEFAULT NAME';
    next();
})

.get('/todo', function(req, res) {
    res.render('todo.ejs', {todolist: req.session.todolist, fullname: req.session.fullname});

})

.post('/todo/add/', urlencodedParser, function(req, res) {
    if (req.body.newtodo != '') {
        req.session.todolist.push(req.body.newtodo);
    }
    res.redirect('/todo');
})

.get('/todo/modify/:newName', urlencodedParser, function(req, res) {
    req.session.fullname = req.params.newName;
    res.render('todo.ejs', {todolist: req.session.todolist, fullname: req.session.fullname});
})


.get('/todo/delete/:id', function(req, res) {
    if (req.params.id != '') {
        req.session.todolist.splice(req.params.id, 1);
    }
    res.redirect('/todo');
})

/* Redirects to the to do list if the page requested is not found */
.use(function(req, res, next){
    res.redirect('/todo');
})


.listen(8080);