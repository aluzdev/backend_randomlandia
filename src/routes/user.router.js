const express = require("express");
const userUseCase = require("../usecases/user.usecase");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const allUsers = await userUseCase.getAll();
    res.json({
      success: true,
      message: "All users",
      data: {
        users: allUsers,
      },
    });
  } catch (error) {
    res.status(error.status || 500);
    res.json({
      success: false,
      message: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const newUser = await userUseCase.create(req.body);
    res.status(201).json({
      success: true,
      message: "User created",
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
});

module.exports = router;
