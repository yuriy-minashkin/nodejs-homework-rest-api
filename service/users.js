const { User } = require("../service/schemas/userSchema");
const jwt = require("jsonwebtoken");

const findUserByEmail = async (data) => {
  const user = await User.findOne(data);
  return user;
};

const register = async ({ email, avatarURL, password, verificationToken }) => {
  const newUser = new User({ email, avatarURL, password, verificationToken });
  newUser.setPassword(password);
  await newUser.save();
  return newUser;
};

const login = async (_id, token) => {
  await User.findByIdAndUpdate(_id, { token });
};

const createToken = ({ _id }) => {
  const { JWT_SECRET } = process.env;
  const playload = {
    id: _id,
  };

  const token = jwt.sign(playload, JWT_SECRET, { expiresIn: "1h" });
  return token;
};

const logout = async (_id) => {
  await User.findByIdAndUpdate(_id, { token: null });
};

const updateSubscription = async (_id, subscription) => {
  const subscriptionList = ["starter", "pro", "business"];

  if (!subscriptionList.includes(subscription)) {
    return false;
  }

  const updatedStatus = await User.findByIdAndUpdate(
    _id,
    { $set: { subscription } },
    { new: true, select: "_id email subscription" }
  );
  return updatedStatus;
};

const updateAvatar = async (_id, avatarURL) => {
  const updatedAvatar = await User.findByIdAndUpdate(_id, { avatarURL });
  return updatedAvatar;
};

const verifyUser = async (_id) => {
  await User.findByIdAndUpdate(_id, { verify: true, verificationToken: null });
};

module.exports = {
  findUserByEmail,
  register,
  login,
  createToken,
  logout,
  updateSubscription,
  updateAvatar,
  verifyUser,
};
