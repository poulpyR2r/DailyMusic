const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  music_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Music",
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  vote_date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const Vote = mongoose.model("Vote", voteSchema);

module.exports = Vote;
