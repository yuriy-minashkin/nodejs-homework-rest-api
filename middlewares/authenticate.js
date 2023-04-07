const { User } = require("../service/schemas/userSchema");
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    return res.status(401).json({ message: "Not authorized" });
  }
  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);

    if (!user || !user.token || user.token !== token) {
      return res.status(401).json({ message: "Not authorized" });
    }
    req.user = user;
    next();
  } catch {
    res.status(401).json({ message: "Not authorized" });
  }
};

module.exports = { authenticate };
