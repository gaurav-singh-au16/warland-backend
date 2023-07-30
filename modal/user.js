const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  gameUrl: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    required: false,
    default: 1,
    comment: "1--> active, 0-->inactive"
  }
});

const Game = mongoose.model('user', gameSchema);

module.exports = Game;