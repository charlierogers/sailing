/**
 * Created by charlie on 10/8/16.
 */

var app = {};

var Backbone = require('backbone');
var IndexView = require('./indexView.js');
var Router = require('./router.js');


app.router = new Router();
Backbone.history.start();
app.indexView = new IndexView();



