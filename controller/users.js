const service = require("../service/users");

const registerUser = async (req, res, next) => {
  const { email, password, subscription = "starter" } = req.body;
  const user = await service.findUserByEmail({ email });
  if (user) {
    res.status(409).json({ message: "Email in use" });
    return;
  }
  await service.register({ email, password });
  res.status(201).json({
    user: {
      email,
      subscription,
    },
  });
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await service.findUserByEmail({ email });
  console.log(req.user);
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
  const { email, subscription } = req.user;
  res.json({ email, subscription });
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

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  updateUser,
  logoutUser,
};
