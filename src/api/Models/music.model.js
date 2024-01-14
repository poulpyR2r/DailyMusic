const mongoose = require("mongoose");

const musicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  music_id: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Music = mongoose.model("Music", musicSchema);

module.exports = Music;
