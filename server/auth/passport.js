import passport from "passport";
import localStrategy from "passport-local";
import jwtStrategy from "passport-jwt";
import "dotenv/config.js";

import User from "../models/user.js";

const LocalStrategy = localStrategy.Strategy;
const JwtStrategy = jwtStrategy.Strategy;

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) token = req.cookies["access_token"];
  return token;
};

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: process.env.SECRET_KEY,
    },
    (payload, done) => {
      User.findById({ _id: payload.sub }, (err, user) => {
        if (err) return done(err, false);
        if (user) return done(null, user);
        else return done(null, false);
      });
    }
  )
);

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username }, (err, user) => {
      if (err) return done(err);
      if (!user) return done(null, false);
      user.comparePassword(password, done);
    });
  })
);
