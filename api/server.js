const express = require("express");
const { logger } = require("./middleware/middleware");
const usersRouter = require("./users/users-router");

const server = express();

server.use(express.json());

server.use(logger);

server.get("/", (req, res) => {
  res.send(`<h2>Biraz ara yazılım yazalım!</h2>`);
});

server.use("/api/users", usersRouter);

module.exports = server;
