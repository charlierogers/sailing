/**
 * Created by charlie on 10/8/16.
 */

var express = require('express');
// var mysql = require('mysql');
var app = express();

var port = process.env.PORT || 3000;

// var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     database: 'main'
// });

// connection.connect();

app.get('/', function (req, res) {
    res.send('Damn dude. This is the sailing team.');
});

app.listen(port, function () {
    console.log('Listening on port ' + port + '...');
});
