/**
 * Created by charlie on 10/8/16.
 */

var express = require('express');
// var mysql = require('mysql');
var app = express();

app.use(express.static('public'));
// app.use(express.static('src/views'));
app.use(express.static('src/js'));
app.set('views', './src/views');

app.set('view engine', 'ejs');

var port = process.env.PORT || 3000;

// var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     database: 'main'
// });

// connection.connect();

app.get('/', function (req, res) {
    res.render('index_backbone');
});

app.listen(port, function () {
    console.log('Listening on port ' + port + '...');
});
