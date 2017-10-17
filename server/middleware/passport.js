const bCrypt = require('bcrypt-nodejs');
const models = require('../models');

module.exports = function(passport, user) {
  const LocalStrategy = require('passport-local').Strategy;

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser((id, done) => {
    models.user
      .findById(id)
      .then((user) => {
        if (user) {
          done(null, user.get());
        } else {
          done(user.errors, null);
        }
      })
  });

  passport.use('local-signup', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    }, (req, email, password, done) => {
      if (req.body.accountType === 'admin') {
        done(null, false, { message: 'You are unauthorized to make an admin account' });
      } else {
        models.user
          .findOne({
            where: { 
              $or: [
                { email: email },
                { username: req.body.username }
              ]
            }
          })
          .then((user) => {
            if (user) {
              if (user.email === email) {
                done(null, false, { message: 'Email already in use' });
              }
              if (user.username === req.body.username) {
                done(null, false, { message: 'Usernmae already in use' });
              }
            } else {
              // Create the user
              const newUser = models.user.build({
                email: email,
                password: '',
                username: req.body.username,
                accountType: req.body.accountType,
                businessName: req.body.businessName || ""
              });

              // Hash that password
              newUser.generateHash(password);

              // Save the user
              newUser.save()
                .then((user, created) => {
                  if (!user) {
                    done(null, false);
                  }
                  done(null, user.getUser());
                })
                .catch((err) => {
                  done(null, false, { message: err });
                });
            }
          });
      }
    }
  ));

  passport.use('local-login', new LocalStrategy(
    (username, password, done) => {
      models.user
        .findOne({
          where: { username: username }
        })
        .then((user) => {
          if (!user) {
            return done(null, false, { error: 'User does not exist' });
          }
          if (!user.validatePassword(password)) {
            return done(null, false, { error: 'Incorrect password' });
          }
          return done(null, user.getUser());
        })
        .catch((err) => {
          return done(null, false, { error: 'Something went wrong with login' });
        })
    }
  ))
}
