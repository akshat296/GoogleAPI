var prompt = require('prompt');
var express = require('express');
var app = express();

app.get('/', function (req, res) {
   console.log('test');
   res.send('Hello World');
})

app.listen(3000,function(){
    console.log("server listening on port :",3000);
}).on('error',function (e){
    if (e.code == "EADDRINUSE"){  
    var user_answer = prompt("Address already in use \n do you want to run it on another port instead? Y or N");
    if (user_answer === 'Y' || user_answer === 'Yes')
    {
        console.log('will run on different port soon');
    }
    else {
        app.close();
    }
}})

