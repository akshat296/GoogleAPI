var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
app.use(expressValidator({
    errorFormatter: function (param, msg, value){
        var namespace = param.split('.')
        , root = namespace.shift()
        , formParam = root;

        while (namespace.length){
            formParam += '['  + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg : msg,
            value: value
        };}
    }));

var cookieParser = require('cookie-parser');
var multer = require('multer');
var upload = multer();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());
app.use(express.static(path.join(__dirname,'public')));
var logger = function (req, res, next){
    console.log("logging...");
    next();
}
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'public'));
app.use(logger);
var persons = [
              {
                name: "Ross", 
                email: "ross@gmail.com"
              },
              { 
                name: "Jenny", 
                email: "jenny@gmail.com" 
              },
              { 
               name: "Sheldon", 
               email: "sheldon@gmail.com"
              }]
app.get('/', function (req, res) {
    res.render('register',{
        persons
    });
 })
 app.post('/pages/register',function(req,res){
    req.checkBody('name','Name is required').notEmpty();
    req.checkBody('password','Password is required').notEmpty();
    req.checkBody('email','email is required').notEmpty();

    var errors = req.validationErrors();
    if(errors){
        res.render('register',{
            errors: errors,
            persons:persons
        })
        console.log(errors);
    }
    else{
    var newUser = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password 
    };
    console.log('Success');
 }});
//var port = Math.floor(Math.random()*10000);
app.listen(4004);
console.log("App is running on" ,4004);

