const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const apiRouter = require("./routes/apiRouter");
const connectToDatabase = require("./database/connect");
const pagesRouter = require("./routes/page.js")
const cors = require("./middlewares/cors");
const PORT = 3001;

const app = express();
connectToDatabase();

app.use(
  cors,
  cookieParser(),
  bodyParser.json(),
  pagesRouter,
  apiRouter,
  express.static(path.join(__dirname, "public")),
);


app.listen(PORT);