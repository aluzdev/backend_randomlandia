const express = require("express");
const userUseCase = require("../usecases/user.usecase");
const { response } = require("../server");

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
    response.status(error.status || 500);
    response.json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
