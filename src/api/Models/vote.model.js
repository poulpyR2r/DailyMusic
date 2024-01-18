const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  music_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Music"
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const Vote = mongoose.model("Vote", voteSchema);

module.exports = Vote;
