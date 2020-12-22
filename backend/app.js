const express = require("express");
const session = require("express-session");
const store = require("better-express-store");

const app = express();
const RestApi = require("./RestApi");
const ACL = require("./middleware/ACL");
const ACLsettings = require("./middleware/ACLsettings");

//Allow JSON in Express
app.use(express.json());

//Prevent badly formated JSON in req.body
