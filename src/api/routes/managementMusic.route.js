const express = require("express");
const router = express.Router();
const {
  submitMusic,
  getAllMusicBySession,
} = require("../controllers/musicManagement.controller");

router.post("/music", submitMusic);
router.get("/get-musics/:sessionId", getAllMusicBySession);

module.exports = router;
