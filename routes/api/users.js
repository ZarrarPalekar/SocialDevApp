const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

const { check, validationResult } = require("express-validator");

const User = require("../../models/User"); // bring is User model

// @route  POST api/users
// @desc   Register user
// @access Public
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      const { name, email, password } = req.body;
      try {
        // See if user exists

        let user = await User.findOne({ email: email });

        // If user exists send back exists error
        if (user) {
          return res
            .status(400)
            .json({ errors: [{ msg: "User already exists" }] }); // this errors was formatted by Brad in such a way so as to be like same as errors.array() msg format

          //add return before res.status to avoid error like "UnhandledPromiseRejectionWarning: Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client"
        }

        // Get users gravatar
        const avatar = gravatar.url(email, { s: "200", r: "pg", d: "mm" });

        //s is size, r is rating so pg is parental guidance ie no obscene gravatars, d is default image which is like a user icon in case no gravatar

        user = new User({
          name,
          email,
          avatar,
          password,
        }); // this just creates the new User instance it doesnt save to db yet

        // Encrypt password with bcrypt
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

        //anything that returns a promise you make sure to put await in front of, if we dont use async await then we will have to use .then() .catch()

        // Return jsonwebtoken (this is because in the front end when the user registers we want them to get loggedin right away and in order to login you have to have that token)

        const payload = {
          user: {
            id: user.id,
          },
        };

        jwt.sign(
          payload,
          config.get("jwtSecret"),
          {
            expiresIn: 3600,
          },
          (err, token) => {
            if (err) {
              throw err;
            } else {
              res.json({ token });
            }
          }
        );

        // res.send("User Registered");
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
      }
    }
  }
);

module.exports = router;
