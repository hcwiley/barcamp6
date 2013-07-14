var express         = require('express')
  , routes          = require('./routes')
  , http            = require('http')
  , path            = require('path')
  , sass            = require('node-sass')
  , passport        = require('passport')
  , TwitterStrategy = require('passport-twitter').Strategy
  , partials        = require('express-partials')
  , io              = require('socket.io')
  , mongoose        = require('mongoose')
  ;

var TWITTER_CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY;
var TWITTER_CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new TwitterStrategy({
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_CONSUMER_SECRET,
    callbackURL: "http://"+process.env.DOMAIN+"/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {

      // To keep the example simple, the user's Twitter profile is returned to
      // represent the logged-in user. In a typical application, you would want
      // to associate the Twitter account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }
));

var app = express();

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
  app.use(
    sass.middleware({
        src         : __dirname + '/sass'
      , dest        : __dirname + '/public'
      , debug       : true
      , force       : true
    })
  );
}

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(partials()); // ejs partials
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.cookieParser(process.env.COOKIE_SECRET || 'barcampz'));
app.use(express.session());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.render('index', { user: req.user, layout: 'layout' });
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

app.get('/account', ensureAuthenticated, function(req, res){
  res.render('account', { user: req.user, layout: 'layout' });
});

app.get('/login', function(req, res){
  res.render('login', { user: req.user, layout: 'layout' });
});

app.get('/auth/twitter',
  passport.authenticate('twitter'),
  function(req, res){
  });

app.get('/auth/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

var server = http.createServer(app).listen(app.get('port'), function(){
  io.listen(server);
  console.log('Express server listening on port ' + app.get('port'));
  console.log('Visit: http://127.0.0.1:' + app.get('port'));
});


