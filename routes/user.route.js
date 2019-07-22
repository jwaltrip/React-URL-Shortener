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

/*
*   @route POST /login
*   @desc  Logs in an user and creates a JWT token for them
*
* */
router.post("/login", async (req, res) => {
  // check to make sure the req body contains valid data
  const { errors, isValid } = validateLoginInput(req.body);
  
  if(!isValid) {
    return res.status(400).json(errors);
  }
  
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({
      where: { email }
    });
    
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }
    
    bcrypt.compare(password, user.password)
      .then(isMatch => {
        if (isMatch) {
          const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar
          };
          jwt.sign(payload, process.env.SECRET || "superTOPsecret", {
            expiresIn: 4800
          }, (err, token) => {
            if (err) console.error(`Error creating JWT token. ${err}`);
            else {
              res.json({ success: true, token: `Bearer ${token}` });
            }
          })
        }
        // if password was a mis-match
        else {
          errors.password = 'Incorrect Password';
          return res.status(400).json(errors);
        }
      })
    
  } catch (err) {
    console.error(`[route /login ] Error finding user. ${err}`);
    res.status(400).json(err);
  }
  
  // User.findOne({email})
  //   .then(user => {
  //     if(!user) {
  //       errors.email = 'User not found'
  //       return res.status(404).json(errors);
  //     }
  //     bcrypt.compare(password, user.password)
  //       .then(isMatch => {
  //         if(isMatch) {
  //           const payload = {
  //             id: user.id,
  //             name: user.name,
  //             avatar: user.avatar
  //           }
  //           jwt.sign(payload, 'secret', {
  //             expiresIn: 3600
  //           }, (err, token) => {
  //             if(err) console.error('There is some error in token', err);
  //             else {
  //               res.json({
  //                 success: true,
  //                 token: `Bearer ${token}`
  //               });
  //             }
  //           });
  //         }
  //         else {
  //           errors.password = 'Incorrect Password';
  //           return res.status(400).json(errors);
  //         }
  //       });
  //   });
});

/*
*   @route GET /me
*   @desc  Checks for a valid JWT token, and returns user info if valid
*
* */
router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
  return res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  });
});

module.exports = router;
