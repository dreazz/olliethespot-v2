const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const spotSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  location: {
    type: {
      type: String
    },
    coordinates: [String]
  }
});

const Spot = mongoose.model('Spot', spotSchema);

module.exports = Spot;
