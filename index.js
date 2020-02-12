const express = require("express");
const PostRouter = require("./expressRouter/post");
const server = express();
server.use(express.json());
server.use("/api/posts", PostRouter);

server.get("/", (req, res) => {
  res.send("home page");
});

// ** create listening on port
server.listen(9000, () => {
  console.log(`listening on port 9000`);
});
