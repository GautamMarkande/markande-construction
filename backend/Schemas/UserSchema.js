const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      default:
        "https://i.pinimg.com/originals/ad/73/1c/ad731cd0da0641bb16090f25778ef0fd.jpg",
    },
  },
  { timestamps: true },
);
module.exports = mongoose.model("user", UserSchema);
