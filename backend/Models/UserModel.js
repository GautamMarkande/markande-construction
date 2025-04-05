const UserSchema = require("../Schemas/UserSchema");

const registerUser = ({ name, username, email, hashedPass, photo }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userObj = new UserSchema({
        name: name,
        username: username,
        email: email,
        password: hashedPass,
        photo:
          photo ||
          "https://i.pinimg.com/originals/ad/73/1c/ad731cd0da0641bb16090f25778ef0fd.jpg",
      });
      const userDb = await userObj.save();
      resolve(userDb);
    } catch (error) {
      reject(error);
    }
  });
};
const verifyUser = ({ username, email }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userExist = await UserSchema.findOne({
        $or: [{ username }, { email }],
      });
      if (userExist && userExist.username === username) {
        reject("Username  aleady register");
      } else if (userExist && userExist.email === email) {
        reject("Email already registered");
      } else {
        resolve();
      }
    } catch (error) {
      return res.send({
        status: 500,
        message: "Internal  server error",
      });
    }
  });
};

const findUser = ({ userId }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const UserDb = await UserSchema.findOne({
        $or: [{ username: userId }, { email: userId }],
      });
      resolve(UserDb);
    } catch (error) {
      reject(error);
    }
  });
};

const findUserById = ({ id }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await UserSchema.findById(id);
      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = { registerUser, verifyUser, findUser, findUserById };
