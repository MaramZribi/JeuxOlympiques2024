const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const evenementSchema = new Schema({
  site: { type: String, required: true },
  date: { type: Date, required: true },
  heure: { type: String, required: true },
  description: { type: String, required: true }
});

const sportSchema = new Schema({
  sport: { type: String, required: true },
  image:{ type: String, required: true },
  événements: [evenementSchema]
});

const Sport = mongoose.model('Sport', sportSchema);

module.exports = Sport;
