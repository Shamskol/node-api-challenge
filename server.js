const express = require("express");
const cors = require('cors');
const server = express();

const projectsRouter = require("./projects/projectsRouter");
const actionsRouter = require("./actions/actionsRouter");

server.use(express.json());
server.use(cors())
 server.use(logger);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  const { method, originalUrl } = req;
  console.log(`${method} to ${originalUrl}`);

  next();
}

server.use("/api/actions", actionsRouter);
server.use("/api/projects", projectsRouter);

module.exports = server;