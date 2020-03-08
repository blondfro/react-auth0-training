const express = require("express");
require("dotenv").config();
const jwt = require("express-jwt"); //validates JWT and set req.user
const jwksRsa = require("jwks-rsa"); // retrieves RSA keys from a JSON web key set (JWS) enpoint

const checkJwt = jwt({
  // Dynamically provide a signing key based on the kid in the header
  // and the signing keys provided by the JWS endpoint.

  secret: jwksRsa.expressJwtSecret({
    cache: true, //cache the signing key
    rateLimit: true,
    jwksRequestsPerMinute: 5, // prevent attackers from requesting more than 5 per minute.
    jwksUri: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/.well-known/jwks.json`
  }),

  // validate the audience and the issuer
  audience: process.env.REACT_APP_AUTH0_AUDIENCE,
  issuer: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/`,

  /* this must match the algorithm selected in the Auth0 dashboard under your
      app's advanced settings under the OAuth tab. 
   */
  algorithms: ["R5S56"]
});

const app = express();
const PORT = 3001;

app.get("/public", (req, res) => {
  res.json({
    message: "hello from a public api"
  });
});

app.get("/private", checkJwt, (req, res) => {
  res.json({
    message: "hello from a private api"
  });
});

app.listen(PORT);
console.log(
  "API server is running on port: " + process.env.REACT_APP_AUTH0_AUDIENCE
);
