const mongoose = require("mongoose");

const votingSessionSchema = new mongoose.Schema({
  module_name: {
    type: String,
    required: true,
  },
  expiration_date: {
    type: Date,
    required: true,
  },
  categorie: {
    type: String,
    required: true,
  },

  musics: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Music",
    },
  ],
});

const VotingSession = mongoose.model("VotingSession", votingSessionSchema);

module.exports = VotingSession;
