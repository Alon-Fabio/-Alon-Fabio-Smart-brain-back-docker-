const redisClient = require("./signin").redisClient;

const getAuthentication = (req, res, next) => {
  const { authentication } = req.headers;

  if (!authentication) {
    return res.status(401).json("Not authorized");
  }
  return redisClient.get(authentication, (err, reply) => {
    if (err || !reply) {
      return res.status(401).json("Not authorized");
    }
    return next();
  });
};

module.exports = {
  getAuthentication: getAuthentication,
};
