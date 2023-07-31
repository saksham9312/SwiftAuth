const mongoose = require('mongoose');
const url = process.env.MONGODB_URL;
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(url);

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}