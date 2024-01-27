jest.mock("../Models/votingSession.model");
const VotingSession = require("../Models/votingSession.model");
const Music = require("../Models/music.model");
const votingSessionController = require("../controllers/votingSession.controller");

describe("createVotingSession", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        module_name: "ModuleName",
        expiration_date: new Date(),
        categorie: "Categorie",
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should create a new voting session", async () => {
    VotingSession.mockImplementation(() => ({
      save: jest.fn().mockResolvedValue({
        _id: "sessionId",
        module_name: "ModuleName",
        expiration_date: new Date(),
        categorie: "Categorie",
      }),
    }));

    await votingSessionController.createVotingSession(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      data: {
        id: "sessionId",
        module_name: "ModuleName",
        expiration_date: expect.any(Date),
        categorie: "Categorie",
      },
    });
  });

  // Add more tests for error cases if needed
});

describe("getInformationOfVotingSession", () => {
  let req, res;

  beforeEach(() => {
    req = { params: { sessionId: "sessionId" } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should return information of a voting session", async () => {
    VotingSession.findById = jest.fn().mockResolvedValue({
      _id: "sessionId",
      module_name: "ModuleName",
      expiration_date: new Date(),
      categorie: "Categorie",
    });

    await votingSessionController.getInformationOfVotingSession(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      votingSession: expect.any(Object),
    });
  });

  // Add tests for error cases
});

describe("getAllVotingSessions", () => {
  let req, res;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should return all voting sessions", async () => {
    VotingSession.find = jest.fn().mockResolvedValue([
      {
        _id: "sessionId",
        module_name: "ModuleName",
        expiration_date: new Date(),
        categorie: "Categorie",
      },
    ]);

    await votingSessionController.getAllVotingSessions(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      data: { votingSessions: expect.any(Array) },
    });
  });
});

describe("deleteVotingSession", () => {
  let req, res;

  beforeEach(() => {
    req = { params: { sessionId: "sessionId" } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should delete a voting session", async () => {
    const mockSession = { musics: ["musicId1", "musicId2"], _id: "sessionId" };
    VotingSession.findById = jest.fn().mockResolvedValue(mockSession);
    Music.deleteMany = jest.fn().mockResolvedValue({});
    VotingSession.findByIdAndDelete = jest.fn().mockResolvedValue({});

    await votingSessionController.deleteVotingSession(req, res);

    expect(VotingSession.findById).toHaveBeenCalledWith("sessionId");
    expect(Music.deleteMany).toHaveBeenCalledWith({
      _id: { $in: mockSession.musics },
    });
    expect(VotingSession.findByIdAndDelete).toHaveBeenCalledWith("sessionId");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      message: "Session and associated musics deleted successfully",
    });
  });

  it("should return 404 if session not found", async () => {
    VotingSession.findById = jest.fn().mockResolvedValue(null);

    await votingSessionController.deleteVotingSession(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Session not found" });
  });
});

describe("updateVotingSession", () => {
  let req, res;

  beforeEach(() => {
    req = {
      params: { sessionId: "sessionId" },
      body: { musics: ["musicId1", "musicId2"] },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock findByIdAndUpdate et findById avec populate
    VotingSession.findByIdAndUpdate = jest.fn().mockResolvedValue({
      _id: "sessionId",
      module_name: "ModuleName",
      expiration_date: new Date(),
      categorie: "Categorie",
      musics: ["musicId1", "musicId2"],
    });

    VotingSession.findById = jest.fn().mockResolvedValue({
      _id: "sessionId",
      musics: [
        { _id: "mockMusicId", title: "Mock Title", artist: "Mock Artist" },
      ],
      populate: jest.fn().mockReturnThis(),
    });
  });

  it("should return information of a voting session", async () => {
    await votingSessionController.getInformationOfVotingSession(req, res);

    expect(VotingSession.findById).toHaveBeenCalledWith("sessionId");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      votingSession: expect.any(Object),
    });
  });

  it("should return 400 for invalid musics format", async () => {
    req.body.musics = "not-an-array";

    await votingSessionController.updateVotingSession(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      errorMessage: "Invalid musics format.",
    });
  });

  // Vous pouvez ajouter d'autres tests pour les cas d'erreur si nécessaire
});
