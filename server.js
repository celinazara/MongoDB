//DEPENDANCIES
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var logger = require('morgan');

//INIT EXPRESS APP
var express = require('express');
var app = express();

app.use(logger('dev'));
appuse(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static(process.cwd() + '/public'));

var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//NEED TO CONNECT TO MONGODB
mongoose.connect('');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('connected to mongoose!')
});

var routes =require('./controller/controller.js');
app.use('/', routes);

var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log('listening on PORT' + port);
});