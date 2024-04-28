require("dotenv").config();
const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("./db");
const session = require("express-session");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy((username, password, done) => {
    db.get(
      "SELECT * FROM users WHERE username = ?",
      [username],
      (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, {
            message: "Incorrect username.",
          });
        }
        if (user.password !== password) {
          return done(null, false, {
            message: "Incorrect password.",
          });
        }
        return done(null, user);
      }
    );
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  db.get("SELECT * FROM users WHERE id = ?", [id], (err, user) => {
    done(err, user);
  });
});

// Register route
app.post("/register", (req, res) => {
  const { username, password } = req.body;
  db.run(
    "INSERT INTO users (username, password) VALUES (?, ?)",
    [username, password],
    (err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Failed to register user." });
      }
      res.json({ message: "User registered successfully." });
    }
  );
});

app.post("/login", passport.authenticate("local"), (req, res) => {
  res.json({ message: "Login successful.", user: req.user });
});

app.post("/logout", (req, res) => {
  req.logout();
  res.json({ message: "Logout successful." });
});

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

app.get("/", (req, res) => {
  res.send("text to youtube");
});

app.get("/protected", isAuthenticated, (req, res) => {
  res.json({ message: "you are authorized" });
});

app.listen(process.env.PORT, () => {
  console.log(`app listening on port ${process.env.PORT}`);
});
