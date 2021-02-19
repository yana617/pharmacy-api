const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const Admin = require('../models/admin');

passport.use(new LocalStrategy({
  usernameField: 'login',
  passwordField: 'password',
}, ((login, password, done) => {
  Admin.findOne({ login }, 'login salt hash', (err, admin) => {
    if (err) { return done(err); }
    if (!admin) {
      return done(null, false, {
        error: 'No admin with such login',
      });
    }
    if (admin.hash !== bcrypt.hashSync(password, admin.salt)) {
      return done(null, false, { 
        error: 'Invalid password',
      });
    }
    return done(null, admin);
  });
})));

passport.serializeUser((admin, cb) => {
  cb(null, admin._id);
});

passport.deserializeUser((id, cb) => {
  Admin.findById(id, (err, admin) => {
    if (err) { return cb(err); }
    cb(null, admin);
  });
});
