const jwt = require("jsonwebtoken");

const redis = require("redis");
const redisClient = redis.createClient(process.env.REDIS_URI);

const dataFetch = (db, bcrypt, req) => {
  const { email, password } = req.body;

  if (!email || !password) {
    console, log("No email of pass");
    return Promise.reject("incorrect form submission");
  }

  return db
    .select("email", "hash")
    .from("login")
    .where("email", "=", email)
    .then((data) => {
      const isValid = bcrypt.compareSync(password, data[0].hash);

      if (isValid) {
        return db
          .select("*")
          .from("users")
          .where("email", "=", email)
          .then((user) => {
            return user[0];
          })
          .catch((err) => Promise.reject(err));
      } else {
        return Promise.reject("Sorry.. something went wrong.. please try");
      }
    })
    .catch((err) =>
      Promise.reject("Sorry.. something went wrong.. please try")
    );
};

const getAuthTokenID = () => {
  console.log("Fuckkkk");
};

const setToken = (email) => {
  const jwtPayload = email;
  token = jwt.sign({jwtPayload}, process.env.JWT_SECRET, {
    expiresIn: "2d",
  });
  return token;
};
const createSession = (user) => {
  //JWT web token. return user
  const { email, id } = user;
  const token = setToken(email);
  return { success: "true", userId: id, token };
};
const signinAuthentication = (db, bcrypt) => (req, res) => {
  const { authorization } = req.headers;
  return authorization
    ? getAuthTokenId(req, res)
    : dataFetch(db, bcrypt, req)
        .then((dataFromDb) => {
          return dataFromDb.id && dataFromDb.email
            ? createSession(dataFromDb)
            : Promise.reject(dataFromDb);
        })
        .then((userData) => res.json(userData))
        .catch((err) => res.status(400).json(err));
};

module.exports = {
  signinAuthentication: signinAuthentication,
};
