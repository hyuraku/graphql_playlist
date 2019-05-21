const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const publisherSchema = new Schema({
  name: String,
  area: String,
  established: Number
});

module.exports = mongoose.model('Publisher',publisherSchema);