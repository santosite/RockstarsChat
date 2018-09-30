var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var SpotifyStrategy = require('passport-spotify').Strategy;
var app = express(); //PRIMERO SE DECLARA APP

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
  secret:'keyboard cat',
  resave: true,
  saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user,done){
  console.log('serializeUser',user);
  done(null,user);
});

passport.deserializeUser(function(user,done){
  console.log('deserializeUser', user)
  done(null, user);
});

passport.use(
  new SpotifyStrategy(
  {
    clientID: "55bea848b21d496590d6d4c5f66b3b6c",
    clientSecret: "e55ad12295544a47aa1cc6d46b3556f6",
    callbackURL: "http://localhost:3000/auth/spotify/callback"
  },
  function(accessToken, refreshToken, expires_in, profile, done) { 
    return done(null, profile);
  }
  )
); 

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var profileRouter = require('./routes/profile');
//DESPUES SE MANDA APP
var authRouter = require('./routes/auth')(app, express, passport);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login',loginRouter);
app.use("/profile",profileRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
