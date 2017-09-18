const models = require('../models');

module.exports = function(passport, user) {
  const User = user;
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
      models.user
        .findOne({ where: { email: email } })
        .then((user) => {
          if (user) {
            done(null, false, { error: 'Email in use' });
          } else {
            const newUser = models.user.build({
              email: email,
              passwordHash: '',
              username: req.body.username,
              accountType: req.body.accountType
            });
            newUser.generateHash(password);
            newUser.save()
              .then((user, created) => {
                if (!user) {
                  done(null, false);
                }
                done(null, user.getUser());
              })
          }
        })
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