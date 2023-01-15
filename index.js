const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = "8000";
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose')



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


// use express router
app.use('/', require('./routes/r_index'))

// setting up view engine
app.set('view engine', 'ejs');
app.set('views', './views')


app.listen(port, function(err) {
  if (err) {
    console.log(`${err} listening to the error domain`)
  }

  console.log(`Listening on ${port}`)
})