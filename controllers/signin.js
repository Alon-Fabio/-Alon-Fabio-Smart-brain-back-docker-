const jwt = require("jsonwebtoken");

const handleSignin = (db, bcrypt, email, password) => {
  console.log("handle signin", email, password);
  if (!email || !password) {
    console, log("No email of pass");
    return Promise.reject("incorrect form submission");
  }
  console.log("past the beriar");

  db.select("email", "hash")
    .from("login")
    .where("email", "=", email)
    .then((data) => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      console.log(isValid);
      if (isValid) {
        return db
          .select("*")
          .from("users")
          .where("email", "=", "admin@amail.com")
          .then((user) => {
            console, log("the user ##########", user);
            return user[0];
          })
          .catch((err) => res.status(400).json("unable to get user"));
      } else {
        return Promise.reject("wrong credentials");
      }
    })
    .catch((err) => err);
};

const getAuthTokenID = () => {
  console.log("get auth");
};

const setToken = (email) => {
  const jwtPayload = email;
  return (token = jwt.sign(jwtPayload, "jwt secret CHANGE to env var", {
    expiresIn: "2 days",
  }));
};
const createSession = (user) => {
  //JWT web token. return user
  const { email, id } = user;
  const token = setToken(email);
  return { success: "true", userId: id, token };
};
const signinAuthentication = (db, bcrypt) => (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  // const { authorization } = req.headers;
  return false
    ? getAuthTokenId(req, res)
    : handleSignin(db, bcrypt, email, password)
        .then((session) => res.json(session))
        .catch((err) => res.status(400).json(err));
};

module.exports = {
  signinAuthentication: signinAuthentication,
};
