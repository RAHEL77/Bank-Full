const User = require("../models/User");
const Account = require("../models/bankAccount");
const ObjectId = require("mongodb").ObjectID;
const bankAccount = require("../models/bankAccount");
//----------------------------------------------------------
const getUsers = async (req, res) => {
  console.log("in get of /users");
  const users = await User.find();
  //users=array
  if (users) {
    res.json({ users });
  } else {
    res.status(404);
    res.send();
  }
};
//------------------------------------------------------------
const postUsers = async (req, res) => {
  console.log("***** receive user *****", req.body);
  const { name, email } = req.body;

  const user2 = new User({ name, email });
  const createdUser = await user2.save();
  const account = new Account({ userID: createdUser._id, cash: 0, credit: 0 });
  const createdAccount = await account.save();

  res.status(201).json({ createdUser, createdAccount });
  res.send();
};
// --------------------Show details of user--------------------------

const getUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ _id: ObjectId(id) });
  if (user) {
    console.log(id, user._doc);
    res.json({ user: user._doc });
  } else {
    res.status(404);
    res.send();
  }
};

// ---------------Update credit----------------------------------------------
const updateCredit = async (req, res) => {
  const { id } = req.params;
  const { credit } = req.body;
  const account = await bankAccount.findOne({ userID: new ObjectId(id) });
  console.log(account, credit);
  if (!account) {
    res.status(404).json({ msg: "account not found" });
    return;
  }
  if (credit < 0) {
    res.status(400).json({ msg: "credit must be positif" });
    return;
  }

  account.credit = credit;
  const updatedAccount = await account.save();
  res.json(updatedAccount);
  res.send();
  return;
};

// -------------------Depositing-----------------------------------
const deposit = async (req, res) => {
  console.log("***** update user deposit user *****", req.body);
  const { id } = req.params;
  const { cash } = req.body;
  const account = await bankAccount.findOne({ userID: new ObjectId(id) });

  /// 1. Cannot add duplicate users
  // const user = findUser(id);
  if (!account) {
    res.status(404).json({ msg: "user not found" });
    return;
  }
  // user.cash += cash;
  account.cash += cash;

  // updateUser(user);
  const updatedAccount = await account.save();
  res.status(200).json(updatedAccount);
  res.send();
  return;
};

// ----------------------Withdraw money------------------------------
const Withdraw = (req, res) => {
  console.log("***** update user withdraw user *****", req.body);
  const { id } = req.params;
  const { cash } = req.body;
  /// 1. Cannot add duplicate users
  const user = findUser(id);
  if (!user) {
    res.status(404).json({ msg: "user not found" });
    return;
  }
  if (cash < user.credit + user.cash) {
    res.status(400).json({ msg: "cash must be greater than cash+credit" });
    return;
  }

  user.cash -= cash;
  updateUser(user);
  res.status(200).json(user);
  res.send();
  return;
};

module.exports = {
  getUsers,
  postUsers,
  getUser,
  updateCredit,
  deposit,
  Withdraw,
};
