const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

const prisma = new PrismaClient();

passport.serializeUser(function (user, done) {
  done(null, user.UserAccountId);
});

passport.deserializeUser(async function (userId, done) {
  try {
    const user = await prisma.user_account.findUnique({
      where: { UserAccountId: userId },
    });

    done(null, user);
  } catch (error) {
    done(error);
  }
});

passport.use(
  new LocalStrategy(function (username, password, done) {
    prisma.user_account
      .findUnique({
        where: {
          UserName: username,
        },
      })
      .then((user) => {
        if (!user) {
          return done(null, false, { message: "Incorrect username." });
        }
        if (user.Password !== password) {
          return done(null, false, { message: "Incorrect password." });
        }
        return done(null, user);
      })
      .catch((err) => {
        return done(err);
      });
  })
);

router.get("/", (req, res) => {
  console.log(req.user);
  if (req.user) {
    if (req.user.Role === "ADMIN") {
      prisma.user_account.findMany().then((users) => {
        res.status(200).json({ users: users });
      });
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return res.status(500).json({ message: "Failed to authenticate" });
    }
    if (!user) {
      return res.status(401).json({ message: "Incorrect credentials" });
    }
    req.logIn(user, function (err) {
      if (err) {
        return res.status(500).json({ message: "Failed to authenticate" });
      }
      return res.status(200).json({
        message: "Successfully authenticated",
        user: {
          id: user.UserAccountId,
          username: user.UserName,
          email: user.EmailAddress,
        },
      });
    });
  })(req, res, next);
});

router.post("/register", (req, res) => {
  const { username, password, email } = req.body;

  prisma.user_account
    .create({
      data: {
        UserName: username,
        Password: password,
        EmailAddress: email,
      },
    })
    .then((user) => {
      res.status(200).json({ message: "User registered", user: user });
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to register user" });
    });
});

router.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.status(200).json({ message: "Successfully logged out" });
  });
});

module.exports = router;
