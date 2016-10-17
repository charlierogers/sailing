/**
 * Created by charlie on 10/8/16.
 */

var express = require('express');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// var mysql = require('mysql');
var app = express();

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
        callbackURL: 'http://localhost:3000/auth/google/callback'
    },
    function (token, refreshToken, profile, done) {
        process.nextTick(function () {
            done(new Error("Must use a Google Account on the umich.edu domain"));
        });
    })
);

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (id, done) {
        done(null, id);
});

app.get('/auth/google', passport.authenticate('google',
    { scope: ['https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'], hostedDomain: 'umich.edu' }),
    function(req, res){} // this never gets called
);

app.get('/auth/google/callback',
    passport.authenticate('google', {failureRedirect: '/login'}),
    function (req, res) {
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

//End Authentication

app.get('/',
    initialAuthentication,
    function (req, res) {
        res.render('index_backbone');
});

app.listen(port, function () {
    console.log('Listening on port ' + port + '...');
});
