const express = require("express");
require("dotenv").config();

const app = express();
const PORT = 3001;

app.get("/public", (req, res) => {
  res.json({
    message: "hello from a public api"
  });
});

app.listen(PORT);
console.log(
  "API server is running on port: " + process.env.REACT_APP_AUTH0_AUDIENCE
);
