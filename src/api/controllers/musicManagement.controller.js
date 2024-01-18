const Music = require("../Models/music.model");
const VotingSession = require("../Models/votingSession.model");

exports.submitMusic = async (req, res) => {
  const { title, artist } = req.body;

  try {
    const newMusic = new Music({
      title,
      artist,
    });

    const savedMusic = await newMusic.save();
    res.status(201).json({
      status: "success",
      data: {
        id: savedMusic._id,
        title: savedMusic.title,
        artist: savedMusic.artist,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllMusicBySession = async (req, res) => {
  const { sessionId } = req.params;

  try {
    const session = await VotingSession.findById(sessionId).populate("musics");

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    res.status(200).json({ musics: session.musics });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
