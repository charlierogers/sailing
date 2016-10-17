/**
 * Created by charlie on 10/8/16.
 */

var app = {};

var Backbone = require('backbone');
var IndexView = require('./indexView.js');

Backbone.history.start();
app.indexView = new IndexView();



