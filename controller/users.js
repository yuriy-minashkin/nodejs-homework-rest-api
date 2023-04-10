const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const service = require("../service/users");

const registerUser = async (req, res, next) => {
  const { email, password, subscription = "starter" } = req.body;
  const avatarURL = gravatar.url(email);
  const user = await service.findUserByEmail({ email });
  if (user) {
    res.status(409).json({ message: "Email in use" });
    return;
  }
  await service.register({ email, password, avatarURL });
  res.status(201).json({
    user: {
      email,
      subscription,
      avatarURL,
    },
  });
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await service.findUserByEmail({ email });
  if (!user || !user.validPassword(password)) {
    res.status(401).json({ message: "Email or password is wrong" });
  }

  const token = await service.createToken(user);
  await service.login(user._id, token);
  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const getCurrentUser = async (req, res) => {
  const { email, subscription, avatarURL } = req.user;
  res.json({ email, subscription, avatarURL });
};

const updateUser = async (req, res, next) => {
  const { _id } = req.user;
  const { subscription } = req.body;

  if (!subscription) {
    return res.status(400).json({ message: `Missing field subscription` });
  }

  const updatedSubscription = await service.updateSubscription(
    _id,
    subscription
  );
  updatedSubscription
    ? res.json(updatedSubscription)
    : res.status(404).json({ message: `Not found` });
};

const logoutUser = async (req, res) => {
  const { _id } = req.user;
  await service.logout(_id);
  res.status(204).json();
};

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const updateUserAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  console.log(req.file);
  const { _id } = req.user;
  const imgName = `${_id}_${originalname}`;

  try {
    const resultUpload = path.join(avatarsDir, imgName);
    console.log(resultUpload);
    const originalAvatar = await Jimp.read(tempUpload);
    originalAvatar.resize(250, 250).write(tempUpload);

    await fs.rename(tempUpload, resultUpload);

    const avatarURL = path.join("avatars", imgName);

    await service.updateAvatar(_id, avatarURL);
    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(tempUpload);

    throw error;
  }
};

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  updateUser,
  logoutUser,
  updateUserAvatar,
};
