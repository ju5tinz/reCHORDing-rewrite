const mongoose = require('mongoose');

module.exports = () => {
  mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true});
  mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
}