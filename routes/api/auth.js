const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const bcrypt = require("bcryptjs");
// const config = require("config");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");

// @route  GET api/auth
// @desc   Get authenticated user
// @access Protected (just by adding our custom auth middleware below it became protected)

router.get("/", auth, async (req, res) => {
  try {
    // req.user.id comes from auth
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route  POST api/auth
// @desc   Authenticate user and get token
// @access Public
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      const { email, password } = req.body;
      try {
        // See if user exists

        let user = await User.findOne({ email: email });

        // If user exists send back exists error
        if (!user) {
          return res
            .status(400)
            .json({ errors: [{ msg: "Invalid Credentials" }] }); // this errors was formatted by Brad in such a way so as to be like same as errors.array() msg format

          //add return before res.status to avoid error like "UnhandledPromiseRejectionWarning: Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client"
        }

        //anything that returns a promise you make sure to put await in front of, if we dont use async await then we will have to use .then() .catch()

        // Return jsonwebtoken (this is because in the front end when the user registers we want them to get loggedin right away and in order to login you have to have that token)

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          return res
            .status(400)
            .json({ errors: [{ msg: "Invalid Credentials" }] });
        }

        const payload = {
          user: {
            id: user.id,
          },
        };

        jwt.sign(
          payload,
          // config.get("jwtSecret"),
          process.env.jwtSecret,
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
