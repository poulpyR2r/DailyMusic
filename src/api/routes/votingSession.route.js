const express = require("express");
const router = express.Router();

const {
  createVotingSession,
  getInformationOfVotingSession,
  getAllVotingSessions,
  deleteVotingSession,
  updateVotingSession,
} = require("../controllers/votingSession.controller");

router.post("/create-session", createVotingSession);
router.get("/get-sessions", getAllVotingSessions);  
router.get("/get-informations/:sessionId", getInformationOfVotingSession);
router.delete("/delete-session/:sessionId", deleteVotingSession);
router.put("/update-session/:sessionId", updateVotingSession);

module.exports = router;
