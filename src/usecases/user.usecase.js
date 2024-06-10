const User = require("../models/user.model");

//create user ♥
async function create(newUser) {
  try {
    const isDuplicateUser = await User.findOne({ email: newUser.email }); //busco si el usuario ya existe
    if (isDuplicateUser) {
      throw new Error("User already exists");
    }
    newUser.password = await User.encryptPassword(newUser.password);
    const data = await User.create(newUser);
    await data.save();
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
}

//get all ♥
function getAll() {
  const users = User.find();
  return users;
}

async function getById(id) {
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send({ msg: "User not found" });
    }
    res.send(user);
  } catch (err) {
    res.status(400).send({ error: err, msg: err.message });
  }
}

async function deleteById(id) {
  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).send({ msg: "User not found" });
    } else {
      console.log(`deleted user sucesfully:`, user);
      res.status(200).send({ msg: "deleted user sucesfully" });
    }
  } catch (err) {
    res.status(500).send({ error: err, msg: err.message });
  }
}

async function update(id) {
  try {
    if (updates.password) {
      updates.password = await User.encryptPassword(updates.password);
    }
    const user = await User.findByIdAndUpdate(id, updates, { new: true });

    if (!user) {
      return res.status(404).send({ msg: "User not found" });
    }
    console.log("Updated user successfully:", user);
    res.status(200).send(user);
  } catch (err) {
    console.error(err);
    res.status(400).send({ error: err, msg: err.message });
  }
}
//CRUD - Create Read Update Delete
module.exports = { create, getAll, getById, deleteById, update };
