const apiRouter = require("express").Router();

const gameRouter = require("./games");
const categoriesRouter = require("./categories");
const usersRouter = require("./users");
const authRouter = require("./authRouter");

apiRouter.use("/api", gameRouter);
apiRouter.use("/api", categoriesRouter);
apiRouter.use("/api", usersRouter);
apiRouter.use("/api", authRouter);

module.exports = apiRouter;