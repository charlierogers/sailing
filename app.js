/**
 * Created by charlie on 10/8/16.
 */

var express = require('express');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var MongoClient = require('mongodb').MongoClient;
// var mysql = require('mysql');
var app = express();

var mongoUrl = "mongodb://localhost:27017/sailing";
var db;

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static('public'));
app.use(express.static('src/js'));
app.set('views', './src/views');
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');

var port = process.env.PORT || 3000;

// var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     database: 'main'
// });

// connection.connect();


//Authentication
passport.use(new GoogleStrategy({
        clientID: '944893219297-pdvm4didh2ag4t9ghpr1ptqeu5bjd5jv.apps.googleusercontent.com',
        clientSecret: 'NPsIXIVpJTiv7LBY-3iglacM',
        callbackURL: '/auth/google/callback'
    },
    function (accessToken, refreshToken, profile, done) {
        var users = db.collection("users");
    	users.findOne({
    		_id: profile.id
    	}, function(err, user) {
            if (user == null) {
                createNewUser(profile);
            }
        });

        process.nextTick(function () {
        	return done(null, profile);
            // done(new Error("Must use a Google Account on the umich.edu domain"));
        });
    })
);

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (id, done) {
    done(null, id);
});

app.get('/auth/google', 
	passport.authenticate('google', { 
    		scope: ['https://www.googleapis.com/auth/userinfo.profile',
        			'https://www.googleapis.com/auth/userinfo.email'
        			],
        	hostedDomain: "umich.edu" 
        }),
    function(req, res){} // this never gets called
);

app.get('/auth/google/callback',
    passport.authenticate('google', {failureRedirect: '/login'}),
    function (req, res) {
        db;
        res.redirect('/');
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.sendStatus(401);
}

function initialAuthentication(req, res, next) {
    if (req.isAuthenticated()) {return next(); }
    res.redirect('/auth/google');
}

function createNewUser(profile) {
    db.collection("users").insert({
                _id: profile.id,
                name: profile.displayName,
                admin: false,
                phone: "",
                seats: 0,
                position: "",
                year: ""
    });
}

//End Authentication

//function to replace resolution of google photo
String.prototype.replaceAt=function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
}

app.get('/',
    initialAuthentication,
    function (req, res) {
    	// res.send(req.user);

        var userphoto = req.user.photos[0].value;
        var lastIndex = userphoto.lastIndexOf('=');
        userphoto = userphoto.replaceAt(lastIndex + 1, '4');
        userphoto += '0';
        res.render('index_backbone', {username: req.user.displayName, userId: req.user.id, userphoto: userphoto});
});

MongoClient.connect(mongoUrl, function(err, database) {
	if (err) {
		console.log("Error connecting to mongo");
		console.log(err);
	} else {
		console.log("Connected successfully to mongo");
	}
	db = database;

	require('./src/js/api/api.js')(app, db);
	// require('./src/js/api/practices.js')(app, db);
	// require('./src/js/api/events.js')(app, db);
	// require('./src/js/api/users.js')(app);
	// require('./src/js/api/regattas.js')(app);

	app.listen(port, function () {
	    console.log('Listening on port ' + port + '...');
	});
});
