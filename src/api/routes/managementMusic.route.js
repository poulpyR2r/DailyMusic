const express = require("express");
const router = express.Router();
const {
  submitMusic,
  getAllMusicBySession,
  deleteMusicFromSession,
} = require("../controllers/musicManagement.controller");

router.post("/music", submitMusic);
router.get("/get-musics/:sessionId", getAllMusicBySession);
router.delete("/delete-music/:sessionId/:musicId", deleteMusicFromSession);

module.exports = router;
