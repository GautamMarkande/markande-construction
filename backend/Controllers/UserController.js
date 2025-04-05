const express = require("express");
const { validateUser } = require("../Utils/Validation");
const {
  registerUser,
  verifyUser,
  findUser,
  findUserById,
} = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const UserRouter = express.Router();
const jwt = require("jsonwebtoken");
const UserSchema = require("../Schemas/UserSchema");

UserRouter.post("/register", async (req, res) => {
  const { name, username, email, password } = req.body;
  try {
    await validateUser({ name, username, email, password });
  } catch (error) {
    return res.send({
      status: 400,
      error: error,
    });
  }
  try {
    await verifyUser({ username, email });
  } catch (error) {
    return res.send({
      status: 400,
      error: error,
    });
  }
  try {
    const salt = parseInt(process.env.SALT) || 9;
    const hashedPass = await bcrypt.hash(password, salt);

    const userDb = await registerUser({ name, username, email, hashedPass });

    if (!userDb) {
      throw new Error("Error creating the account");
    } else {
      return res.send({
        status: 201,
        message: `The account ${username} has been created`,
      });
    }
  } catch (error) {
    return res.send("error");
  }
});
UserRouter.post("/login", async function (req, res) {
  let { userId, password } = req.body;

  try {
    const userDb = await findUser({ userId });
    if (userDb) {
      const pass = await bcrypt.compare(password, userDb.password);
      if (!pass) {
        return res.send({
          status: 400,
          error: "Password not matched",
        });
      }
      const token = jwt.sign({ id: userDb._id }, process.env.JWT_SECRET);
      const { password: passw, ...rest } = userDb._doc;

      return res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json({ data: { ...rest }, message: "Login Successful" });
    } else {
      return res.status(400).json({
        status: 400,
        error: "please register yourself first",
      });
    }
  } catch (error) {
    return res.send({
      status: 500,
      error: "Internal server error",
    });
  }
});
UserRouter.get("/test", (req, res) => {
  return res.send({
    message: `construction app is running + ${req.session?.user.username}`,
  });
});
UserRouter.post("/google", async (req, res) => {
  const { name, email, photo } = req.body;
  try {
    const userDb = await findUser({ userId: email });
    if (userDb) {
      const { password: passw, ...rest } = userDb._doc;
      return res.send({
        status: 200,
        error: "This account has already been created",
        data: rest,
      });
    }
    const randomPass =
      Math.random().toString(36).slice(-8) +
      Math.random().toString(36).slice(-8);

    const hashedPass = await bcrypt.hash(randomPass, 10);

    const newUser = await registerUser({
      name,
      username: name,
      email,
      hashedPass,
      photo,
    });

    if (!newUser) {
      throw Error("Failed to create an account" + newUser);
    }
    const userDbAfter = await findUser({ userId: email });
    if (userDbAfter) {
      const token = jwt.sign({ id: userDbAfter._id }, process.env.JWT_SECRET);
      const { password: passw, ...rest } = userDbAfter._doc;
      return res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json({
          status: 200,
          message: "login successful",
          data: { ...newUser._doc, password: "hidden" },
        });
    }
    return res.send({
      status: 200,
      message: "login successful",
      data: { ...newUser._doc, password: "hidden" },
    });
  } catch (error) {
    return res.send({
      status: 500,
      error: error,
      data: error,
    });
  }
});
UserRouter.post("/update/:id", async (req, res) => {
  const user = await findUserById({ id: req.params.id });
  if (user?._id.toString() !== req.params.id) {
    return res.send({
      status: 401,
      message: "You can only update your own account",
    });
  }
  const salt = parseInt(process.env.SALT) || 9;
  if (req.body.password) {
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }
  const updatedUser = await UserSchema.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        photo: req.body.photo,
      },
    },
    { new: true },
  );

  const { password, ...rest } = updatedUser._doc;
  return res.status(200).json({
    status: 200,
    message: "user updated successfully",
    data: {
      ...rest,
    },
  });
});
UserRouter.post("/delete/:id", async (req, res) => {
  try {
    const deletedUser = await findUserById({ id: req.params.id });
    if (deletedUser?._id.toString() !== req.params.id) {
      return res.send({
        status: 401,
        message: "You can only update your own account",
      });
    }
    const updatedUser = await UserSchema.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    return res.send({
      status: 200,
      message: "User Deleted successfully",
      data: updatedUser,
    });
  } catch (error) {
    return res.status(500).send({
      status: 500,
      message: "internal server error",
    });
  }
});
UserRouter.get("/sign-out", (req, res) => {
  try {
    res.clearCookie("access_token");
    return res.send({
      status: 200,
      message: "User sign out successfully",
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: "internal server error",
    });
  }
});
UserRouter.get("/get-user/:id", async (req, res) => {
  try {
    const user = await UserSchema.findById(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ error: "Not Found", message: "Unable to find" });
    }
    res.status(200).json({
      success: true,
      user: { email: user.email, username: user.username, name: user.name },
    });
  } catch (error) {
    return res.status(500).res({
      message: "Internal server Error",
    });
  }
});
module.exports = UserRouter;
