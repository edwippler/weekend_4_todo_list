var express = require('express');
var app = express();
var pg = require('pg');
var bodyParser = require('body-parser');
var task = require('./routes/task');
var path = require('path');
var port = 5000;

// uses
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use('/task/', task);

// home base
app.get( '/', function( req, res ){
  console.log( 'home base url hit' );
  res.sendFile( path.resolve( 'server/public/index.html' ) );
}); // end base url


app.listen(port, function(){
  console.log(`listening on port: ${port}`);
});

// app.get('/hello-world', (req, res) => res.send("TEST")) //testing out ES6 shorthand
// console.log(`I am a ${inaminateObject.type}`); //testing out ES6 shorthand
