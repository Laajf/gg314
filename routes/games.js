const gameRouter = require("express").Router();


const {
  findAllGames,
  createGame,
  findGameById,
  updateGame,
  deleteGame,
  checkEmptyFields,
  checkIfCategoriesAvaliable,
  checkIfUsersAreSafe,
  checkIsGameExists,
  checkIsVoteRequest
} = require("../middlewares/games");
const {
  sendAllGames,
  sendGameCreated,
  sendGameById,
  sendGameUpdated,
  sendGameDeleted
} = require("../controllers/games");

const {
  checkAuth
} = require("../middlewares/auth")

gameRouter.get("/games", findAllGames, sendAllGames);
gameRouter.post("/games", findAllGames, checkIsGameExists, createGame, sendGameCreated, checkAuth);
gameRouter.get("/games/:id", findGameById, sendGameById);
gameRouter.put("/games/:id", findGameById, checkIsVoteRequest, checkIfUsersAreSafe, checkIfCategoriesAvaliable, checkEmptyFields, updateGame, sendGameUpdated, checkAuth );
gameRouter.delete("/games/:id", checkAuth, deleteGame, sendGameDeleted)

module.exports = gameRouter;