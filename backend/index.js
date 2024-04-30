require("dotenv").config();
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const MongoDBStore = require("connect-mongodb-session")(session);
const UserSchema = require("./models/UserSchema");
const bcrypt = require("bcrypt");
const cookieparser = require("cookie-parser");

const app = express();
app.use(cors({
  origin: "https://velvety-dasik-44a11f.netlify.app",
  credentials: true
}));

// mongoDB init
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MONGODB connected"))
  .catch((error) =>
    console.error("Error connecting to MongoDB:", error)
  );
  
  // session storage (at mongoDB)
  const mySessions = new MongoDBStore({
    uri: process.env.MONGODB_URI,
    collection: "mySessions",
  });
  
app.use(cookieparser());
app.use(
  session({
    secret: "a1s2d3f4g5h6",
    name: "session-id", // cookies name to be put in "key" field in postman
    store: mySessions,
    cookie: {
      maxAge: 1000 * 60 * 60 * 3, // 3 hours
      secure: false, // to turn on just in production
    },
    resave: true,
    saveUninitialized: false,
  })
);
app.use(bodyParser.json());

// Register route
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const user = await UserSchema.findOne({ username });
  if (user)
    return res.status(400).json({ message: "user already exists" });

  const newUser = new UserSchema({ username, password });
  bcrypt.hash(password, 7, async (err, hash) => {
    if (err)
      return res
        .status(400)
        .json({ message: "error while saving the password" });

    newUser.password = hash;
    const savedUserRes = await newUser.save();

    if (savedUserRes)
      return res
        .status(200)
        .json({ message: "user is successfully saved" });
  });
});

// Login route
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await UserSchema.findOne({ username: username }); // finding user in db
  if (!user) return res.status(400).json({ msg: "User not found" });

  const matchPassword = await bcrypt.compare(password, user.password);
  if (matchPassword) {
    const userSession = { username: user.username };
    req.session.user = userSession;

    console.log(req.session);

    return res
      .cookie("userSession", userSession)
      .status(200)
      .json({ msg: "You have logged in successfully", userSession }); // attach user session id to the response. It will be transfer in the cookies
  } else {
    return res.status(400).json({ msg: "Invalid credential" });
  }
});

// Logout route
app.delete("/logout", async (req, res) => {
  req.session.destroy((error) => {
    if (error) throw error;

    res.clearCookie("session-id");
    res.status(200).send("Logout Success");
  });
});

app.get("/isAuth", async (req, res) => {
  console.log(req.session);
  console.log(req.cookies);
  if (req.session.user) {
    return res.json(req.session.user);
  } else {
    return res.status(401).json("unauthorize");
  }
});

app.get("/", (req, res) => {
  res.json({ req: req.session });
});

app.listen(process.env.PORT, () => {
  console.log(`app listening on port ${process.env.PORT}`);
});
