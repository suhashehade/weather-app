const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const CitySchema = new Schema({
  name: String,
  temperature: { type: Number},
  condition: String,
  conditionPic: String
})

const City = mongoose.model('City', CitySchema)

module.exports = City