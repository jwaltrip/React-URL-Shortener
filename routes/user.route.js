const express = require("express")
const router = express.Router()
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

const User = require("../models/User")

/*
*   @route POST /register
*   @desc  Registers a new user and inserts info into db
*
* */
router.post("/register", async (req, res) => {
  // check to make sure the req body contains valid data
  const { errors, isValid } = validateRegisterInput(req.body);
  // return errors if invalid
  if(!isValid) {
    return res.status(400).json(errors);
  }
  // check to see if user is already registered
  // if not, then create user
  try {
    const user = await User.findOne({
      where: { email: req.body.email }
    });
    console.log(`[user.route.js] user email query: ${JSON.stringify(user)}`);
    // if user was found, then return error saying user already exists
    if (user) {
      return res.status(400).json({
        email: "Email already exists"
      });
    }
    // else, user doesn't exist. Create user
    else {
      // generate avatar img based on Gravatar
      const avatar = gravatar.url(req.body.email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });
  
      // create new user object
      const { name, email, password } = req.body;
      const newUser = {
        name,
        email,
        password,
        avatar
      };
      
      bcrypt.genSalt(10, (err, salt) => {
        if (err) console.error(`[user.route.js] Error generating salt. ${err}`);
        else {
          bcrypt.hash(newUser.password, salt, async (err, hash) => {
            if (err) console.error(`[user.route.js] Error generating hash. ${err}`);
            else {
              // set user password to generated hash
              newUser.password = hash;
              
              try {
                // save new user to db
                const createNewUser = await User.create(newUser);
                // respond with new user object
                res.json(createNewUser);
              } catch (err) {
                console.error(`[user.route.js] Error saving user to db. ${err}`);
              }
            }
          }); // end hash callback
        }
      }); // end genSalt callback
    }
    
  } catch (err) {
    console.error(`[user.route.js] ${err}`);
  }
});

module.exports = router;
