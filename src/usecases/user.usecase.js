const User = require("../models/user.model");

async function create() {
  try {
    let newUser = req.body;
    const user = await User.findOne({ email: newUser.email });
    if (user) {
      return res.status(201).send(`user already exists`);
    }
    newUser.password = await User.encryptPassword(newUser.password);
    const data = await User.create(newUser);
    await data.save();

    console.log(`User saved successfuly:`, data);
    res.status(201).send(data);

    console.log(data);
  } catch (err) {
    console.error(err);
    res.status(400).send({ error: err, msg: err.message });
  }
}

async function getAll() {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    console.error(err);
    res.status(400).send({ error: err, msg: err.message });
  }
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

//borrar usuario por id
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
