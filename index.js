const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = "8000";
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose')
// Used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy')
const MongoStore = require('connect-mongo')

// middleware for cookies encoders
app.use(express.urlencoded())
app.use(cookieParser())
// use static files
app.use(express.static('./assets'));

// use express-ejs-layouts
app.use(expressLayouts)

// extract style and sripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);




// setting up view engine
app.set('view engine', 'ejs');
app.set('views', './views')

// mongo store is used to store the session cookie in the database
app.use(session({
  name: 'sociology',
  // TODO change the seceret before deployment
  secret: 'orisitsecret',
  saveUninitialized: false,
  resave: false,
  cookie:{
    maxAge: (1000*60*100)
  },
  store: MongoStore.create(
    {
      mongoUrl: "mongodb://127.0.0.1:27017/sociology_development",
      autoRemove: "disabled",
    },
    function (err) {
      console.log(err || "connect-mongodb setup ok");
    }
  ),

}))

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// use express router
app.use('/', require('./routes'))


app.listen(port, function(err) {
  if (err) {
    console.log(`${err} listening to the error domain`)
  }

  console.log(`Listening on ${port}`)
})

