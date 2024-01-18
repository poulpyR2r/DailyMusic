const VotingSession = require("../Models/votingSession.model");
const Music = require("../Models/music.model");
exports.createVotingSession = async (req, res) => {
  const { module_name, expiration_date, categorie } = req.body;

  console.log(req.body);

  if (!module_name || !expiration_date || !categorie) {
    return res
      .status(400)
      .json({ errorMessage: "Please enter all required fields." });
  }

  try {
    const newVotingSession = new VotingSession({
      module_name,
      expiration_date,
      categorie,
    });

    const savedVotingSession = await newVotingSession.save();

    res.status(201).json({
      status: "success",
      data: {
        id: savedVotingSession._id,
        module_name: savedVotingSession.module_name,
        expiration_date: savedVotingSession.expiration_date,
        categorie: savedVotingSession.categorie,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getInformationOfVotingSession = async (req, res) => {
  try {
    const votingSession = await VotingSession.findById(req.params.sessionId);
    res.status(200).json({ status: "success", votingSession });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllVotingSessions = async (req, res) => {
  try {
    const votingSessions = await VotingSession.find();
    res.status(200).json({ status: "success", data: { votingSessions } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteVotingSession = async (req, res) => {
  try {
    const sessionId = req.params.sessionId;

    const session = await VotingSession.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    if (session.musics && session.musics.length > 0) {
      await Music.deleteMany({ _id: { $in: session.musics } });
    }

    await VotingSession.findByIdAndDelete(sessionId);

    res
      .status(200)
      .json({
        status: "success",
        message: "Session and associated musics deleted successfully",
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.updateVotingSession = async (req, res) => {
  const { sessionId } = req.params;
  const { musics } = req.body;

  if (!Array.isArray(musics)) {
    return res.status(400).json({ errorMessage: "Invalid musics format." });
  }

  try {
    // Mettez à jour la session de vote
    await VotingSession.findByIdAndUpdate(
      sessionId,
      { $set: { musics } },
      { new: true }
    );

    // Récupérez la session mise à jour avec les musiques populées
    const updatedSession = await VotingSession.findById(sessionId).populate(
      "musics"
    );

    res.status(200).json(updatedSession);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
