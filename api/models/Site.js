const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const siteSchema = new Schema({
    code_site: { type: String, required: true },
    code_site: { type: String, required: true },

    sports: { type: [String], required: true },
    start_date: Date,
    end_date: Date,
    adress: String,
    latitude: String,
    longitude: String,
    point_geo: {
        lon: Number,
        lat: Number
    },
    image: String,
    utilisation: { type: [String], required: true },

});

// Compile model from schema
// Compile model from schema
const Site = mongoose.model('Site', siteSchema, 'sites');

module.exports = Site;
