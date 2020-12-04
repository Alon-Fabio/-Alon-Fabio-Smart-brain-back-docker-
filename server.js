const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
const morgan = require("morgan");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");
const auth = require("./controllers/auth");

const db = knex({
  // connect to your own database here
  client: "pg",
  connection: process.env.POSTGRES_URI,
});

const app = express();

app.use(morgan("combined"));
app.use(cors());
app.use(bodyParser.json());

app.get("/", (res, req) => {
  res.send("It's working and updating !");
});
app.post("/signin", signin.signinAuthentication(db, bcrypt));
app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});
app.get("/profile/:id", auth.getAuthentication, (req, res) => {
  profile.handleProfileGet(req, res, db);
});
app.post("/profile/:id", auth.getAuthentication, (req, res) => {
  profile.handleProfilePost(req, res, db);
});
app.put("/image", auth.getAuthentication, (req, res) => {
  image.handleImage(req, res, db);
});
app.post("/imageurl", auth.getAuthentication, (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(3000, () => {
  console.log("app is running on port 3000");
});
