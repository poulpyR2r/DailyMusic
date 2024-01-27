const Music = require("../Models/music.model");
const VotingSession = require("../Models/votingSession.model");
const musicManagementController = require("../controllers/musicManagement.controller");

jest.mock("../Models/music.model");
jest.mock("../Models/votingSession.model");

describe("musicManagement.controller - submitMusic", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should successfully submit new music", async () => {
    const req = { body: { title: "New Song", artist: "New Artist" } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    Music.mockImplementation(() => ({
      save: jest.fn().mockResolvedValue({
        _id: "newMusicId",
        title: "New Song",
        artist: "New Artist",
      }),
    }));

    await musicManagementController.submitMusic(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      data: {
        id: "newMusicId",
        title: "New Song",
        artist: "New Artist",
      },
    });
  });

  // Ajouter d'autres tests pour les cas d'erreur...
});

describe("musicManagement.controller - getAllMusicBySession", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should get all music for a session", async () => {
    const mockSessionId = "mockSessionId";
    const mockMusics = [{ _id: "music1", title: "Song 1", artist: "Artist 1" }];

    VotingSession.findById = jest.fn().mockImplementation(() => ({
      populate: jest.fn().mockResolvedValue({
        _id: mockSessionId,
        musics: mockMusics,
      }),
    }));

    const req = { params: { sessionId: mockSessionId } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await musicManagementController.getAllMusicBySession(req, res);

    expect(VotingSession.findById).toHaveBeenCalledWith(mockSessionId);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ musics: mockMusics });
  });

  // Ajouter d'autres tests pour les cas d'erreur...
});

describe("musicManagement.controller - deleteMusicFromSession", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should delete music from a session", async () => {
    const mockSession = {
      musics: ["music1"],
      save: jest.fn(),
    };

    VotingSession.findById = jest.fn().mockResolvedValue(mockSession);
    Music.findByIdAndDelete = jest.fn().mockResolvedValue({});

    const req = { params: { sessionId: "sessionId", musicId: "music1" } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await musicManagementController.deleteMusicFromSession(req, res);

    expect(VotingSession.findById).toHaveBeenCalledWith("sessionId");
    expect(Music.findByIdAndDelete).toHaveBeenCalledWith("music1");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Music deleted from session",
    });
  });

  // Ajouter d'autres tests pour les cas d'erreur...
});
