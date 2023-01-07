const express = require('express');
const app = express();
const port = "8000";

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