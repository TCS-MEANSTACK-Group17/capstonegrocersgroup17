
const express = require('express')
const cors = require("cors");
var bodyParser = require('body-parser')

const app = express()
var config = require('./config/config')
var capstoneRoute = require('./router/capstonerouter')
const dbconnection = require('./connection/dbconnection')
var mongoose = require('mongoose');
var connect = config.mongoURI.connectionString
dbconnection.dbconnection(connect)

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', capstoneRoute);

app.listen(9090, () => console.log('capstone on 9090'))


module.exports = {
  app: app
};
