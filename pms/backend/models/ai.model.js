const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let Ai = new Schema({
  status: {
    type: String
  },
  eventloc: {
    type: String
  },
  supplyloc: {
    type: String
  },
  militaryloc: {
    type: String
  },
  negotiatorloc: {
    type: String
  },
});

module.exports = mongoose.model('Ai', Ai);
