//import packages
const express = require("express");
const cors = require("cors");
//db connection file imported
const db = require("../backend/db");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const MongoDbStore = require("connect-mongodb-session")(session);
const path = require("path");
const port = parseInt(process.env.PORT) || 3000;

const _dirname = path.resolve();
const app = express();
app.use(cors());

//files importing
const UserRouter = require("../backend/Controllers/UserController");
const ListingRouter = require("../backend/Controllers/ListingController");

//middlewares
app.use(express.json());
app.use(cookieParser());
//Routers

app.get("/", (req, res) => {
  res.send("Welcome to the Construction App API");
});
app.use("/api/user", UserRouter);
app.use("/api/listing", ListingRouter);

// app.use(express.static(path.join(_dirname, "/client/dist")));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(_dirname, "client", "dist", "index.html"));
// });
app.listen(process.env.PORT, () => {
  console.log("server is running on 3000");
});
