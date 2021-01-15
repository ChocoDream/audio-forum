const express = require("express");
const session = require("express-session");
const store = require("better-express-store");
const path = require("path");

const app = express();
const RestApi = require("./RestApi");
const ACL = require("./middleware/ACL");
const ACLsettings = require("./middleware/ACLsettings");

// Allow JSON in Express
app.use(express.json());

// Prevent badly formated JSON in req.body
app.use((error, req, res, next) => {
  console.error(error);
  if (error) {
    res.status(500);
    res.json({
      error: "Something went wrong - probably badly formatted JSON",
      errorDetails: error,
    });
  }
});

// Add Express-session as middleware
const pathToSecret = path.join(__dirname, "./logic/session-secret.json");


console.log("PATH TO SECRET JSON, PSSTT", pathToSecret);
const secret = require(pathToSecret);
app.use(
  session({
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: "auto" },
    store: store({ dbPath: "./database.db" }),
  })
);

// Add our middleware for handling ACL (access control)
app.use(ACL(ACLsettings));

// Creates REST API from elsewhere
new RestApi(app);

//Starts the web server
app.listen(4000, () => {
  console.log("Listening on Port 4000");
});
