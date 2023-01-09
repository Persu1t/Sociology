const mongoose = require('mongoose');

main().catch(err => console.log(err, 'Error in connection :('));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/sociology_development');
  console.log("Connected to the mongoDB database :)")
  
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}