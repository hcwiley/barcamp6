var express           = require('express')
  , routes            = require('./routes')
  , http              = require('http')
  , path              = require('path')
  , lessMiddleware = require('less-middleware')
  , passport          = require('passport')
  , TwitterStrategy   = require('passport-twitter').Strategy
  , partials          = require('express-partials')
  , io                = require('socket.io')
  , mongoose          = require('mongoose')
  , socketIo          = require('socket.io')
  , connectAssets     = require("connect-assets")
  , sockets           = require('./sockets')
  , models            = require('./models')
  , User              = models.User
  , jadeBrowser       = require("jade-browser")
  ;

var TWITTER_CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY;
var TWITTER_CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET;

passport.serializeUser(function(user, done) {
  done(null, user.uid);
});

passport.deserializeUser(function(uid, done) {
  User.findOne({uid: uid}, function (err, user) {
    done(err, user);
  });
});

passport.use(new TwitterStrategy({
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_CONSUMER_SECRET,
    callbackURL: "http://"+process.env.DOMAIN+"/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, done) {
    User.findOne({uid: profile.id}, function(err, user) {
      if (user) {
        done(null, user);
      } else {
        var user = new User();
        user.provider = "twitter";
        user.uid = profile.id;
        user.name = profile.displayName;
        user.image = profile._json.profile_image_url;
        user.save(function(err) {
          if(err) { throw err; }
          done(null, user);
        });
      }
    });
  }
));

var app = express();

// export jade templates to reuse on client side
// This includes a kind of terrible cache-buster hack
// It generates a new cache-busting query string for the script tag every time the server starts
// This should probably only happen every time there's a change to the templates.js file
var jadeTemplatesPath = '/js/templates.js';
app.use(jadeBrowser(jadeTemplatesPath, ['*.jade', '*/*.jade', '*/*/*.jade'], { root: __dirname + '/views', minify: true }));
var jadeTemplatesCacheBuster = (new Date()).getTime();
var jadeTemplatesSrc = jadeTemplatesPath + '?' + jadeTemplatesCacheBuster;
global.jadeTemplates = function() { return '<script src="' + jadeTemplatesSrc + '" type="text/javascript"></script>'; }

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.cookieParser(process.env.COOKIE_SECRET || 'barcampz'));
app.use(express.session());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(lessMiddleware({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));

// use the connect assets middleware for Snockets sugar
app.use(connectAssets());

app.get('/', function(req, res){
  res.render('index', { user: req.user });
});

app.get('/latest', routes.lastTen);
app.get('/tag_stats', routes.topFive);
app.get('/leaderboard/:tag', routes.leaderboard);

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

app.get('/account', ensureAuthenticated, function(req, res){
  res.render('account', { user: req.user });
});

app.get('/login', function(req, res){
  res.render('login', { user: req.user });
});

app.get('/about', function(req, res){
  res.render('about', { user: req.user });
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
  console.log('Express server listening on port ' + app.get('port'));
  console.log('Visit: http://127.0.0.1:' + app.get('port'));
});

// Socket.io setup
var io = socketIo.listen(server)

sockets(io);

