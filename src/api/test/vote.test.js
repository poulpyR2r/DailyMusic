jest.mock("../Models/vote.model");
jest.mock("../Models/music.model");
const Vote = require("../Models/vote.model");
const Music = require("../Models/music.model");
const voteController = require("../controllers/vote.controller");

describe("addVote", () => {
  let req, res;

  beforeEach(() => {
    req = { 
      body: { userId: "userId", musicId: "musicId", sessionId: "sessionId" } 
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should add a vote", async () => {
    Vote.findOne = jest.fn().mockResolvedValue(null);
    Vote.mockImplementation(() => ({
      save: jest.fn().mockResolvedValue({}),
    }));
    Music.findByIdAndUpdate = jest.fn().mockResolvedValue({});

    await voteController.addVote(req, res);

    expect(Vote.findOne).toHaveBeenCalledWith({
      user_id: "userId",
      session_id: "sessionId",
    });
    expect(Music.findByIdAndUpdate).toHaveBeenCalledWith("musicId", { $inc: { vote_count: 1 } });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: "Vote added successfully." });
  });

  it("should return 400 if user has already voted", async () => {
    Vote.findOne = jest.fn().mockResolvedValue({});

    await voteController.addVote(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "User has already voted for this sessions",
      existingVote: {},
    });
  });

});

describe("getVotesByMusic", () => {
    let req, res;
  
    beforeEach(() => {
      req = { params: { musicId: "musicId" } };
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
    });
  
    it("should return votes for a music", async () => {
      Vote.find = jest.fn().mockResolvedValue(["vote1", "vote2"]);
  
      await voteController.getVotesByMusic(req, res);
  
      expect(Vote.find).toHaveBeenCalledWith({ music_id: "musicId" });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ votes: ["vote1", "vote2"] });
    });
  
  });

  describe("getVotesByMusic", () => {
    let req, res;
  
    beforeEach(() => {
      req = { params: { musicId: "musicId" } };
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
    });
  
    it("should return votes for a music", async () => {
      Vote.find = jest.fn().mockResolvedValue(["vote1", "vote2"]);
  
      await voteController.getVotesByMusic(req, res);
  
      expect(Vote.find).toHaveBeenCalledWith({ music_id: "musicId" });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ votes: ["vote1", "vote2"] });
    });
  
  });
  
  
