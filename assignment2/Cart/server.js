var express = require('express'),
  app = express(),
  port = process.env.PORT || 8080,
  mongoose = require('mongoose'),
  Task = require('./api/models/Model'), //created model loading here
  bodyParser = require('body-parser');
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://Cluster0User:cluster0pass@cluster0-9u0z0.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/Routes'); //importing route
routes(app); //register the route

app.listen(port);

console.log('RESTful API server started on: ' + port);