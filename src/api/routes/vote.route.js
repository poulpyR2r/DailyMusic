const express = require("express");
const { addVote, getVotesByMusic } = require("../controllers/vote.controller");
const router = express.Router();

router.post("/vote", addVote);
router.get("/get-votes/:musicId", getVotesByMusic);

module.exports = router;
