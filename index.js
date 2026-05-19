// require your server and launch it
const server = require("./api/server");

server.listen(process.env.PORT || 5000, () => {
  console.log(`\n** Server listening on port ${process.env.PORT || 5000} **\n`);
});
