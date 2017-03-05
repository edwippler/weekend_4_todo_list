var express = require('express');
var app = express();
var pg = require('pg');
var bodyParser = require('body-parser');
var task = require('./routes/task');
var path = require('path');
var port = 5000;
var inaminateObject = {
  type: 'Teapot'
};

// home base
app.get( '/', function( req, res ){
  console.log( 'home base url hit' );
  res.sendFile( path.resolve( 'server/public/index.html' ) );
}); // end base url

app.use(express.static('server/public'));

app.use(bodyParser.urlencoded({extended: true}));// app.use(express.static('server/public'));

app.use('/task/', task);

app.get('/hello-world', (req, res) => res.send("TEST"))

app.listen(port, function(){
  console.log(`I am a ${inaminateObject.type}`);
  console.log(`listening on port: ${port}`);
});
