const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require("./models/User");
const opts = {};

opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET || 'superTOPsecret';

module.exports = (passport) => {
  passport.use(new JWTStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findOne({
        where: { id: jwt_payload.id }
      });
      console.log(`[passport.js] user found: ${user}`);
  
      if (user) {
        return done(null, user);
      }
      return done(null, false);
      
    } catch (e) {
      console.error(`[passport.js] Error: could not find user. ${e}`);
    }
  }));
}
