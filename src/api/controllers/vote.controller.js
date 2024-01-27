  const Vote = require("../Models/vote.model");
  const Music = require("../Models/music.model");

  exports.addVote = async (req, res) => {
    const { userId, musicId, sessionId } = req.body;


    try {
      const existingVote = await Vote.findOne({
        user_id: userId,
        session_id: sessionId,
      });
      if (existingVote) {
        return res.status(400).json({
          message: "User has already voted for this sessions",
          existingVote,
        });
      }

      const newVote = new Vote({
        user_id: userId,
        music_id: musicId,
        session_id: sessionId,
      });
      await newVote.save();

      await Music.findByIdAndUpdate(musicId, { $inc: { vote_count: 1 } });

      res.status(201).json({ message: "Vote added successfully." });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  exports.getVotesByMusic = async (req, res) => {
    const { musicId } = req.params;


    try {
      const votes = await Vote.find({ music_id: musicId });
      res.status(200).json({ votes });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

