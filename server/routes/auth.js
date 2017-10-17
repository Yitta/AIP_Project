const crypto = require('crypto');
const express = require('express');
const models = require('../models');
const passport = require('passport');
const sendgrid = require('@sendgrid/mail');

const config = require('../config/config')[process.env.NODE_ENV || 'development'];

const router = express.Router();

sendgrid.setApiKey(config.sendgrid);

/* POST a new user. */
router.post('/signup', passport.authenticate('local-signup'), (req, res) => res.status(201).json(req.user));

/* POST user login */
router.post('/login', passport.authenticate('local-login'), (req, res) => res.json(req.user));

/* GET user logout */
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.json({ message: "logged out" });
  });
});

/* GET current user */
router.get('/current', (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.json({ accountType: 'anon' });
  }
});

router.post('/forgot', (req, res) => {
  // Generate token
  const sha = crypto.createHash('sha256');
  sha.update(Math.random().toString());
  
  models.user
    .findOne({
      where: { email: req.body.email }
    })
    .then(user => {
      if (!user) {
        res.status(404).json({ message: 'Email not found.' });
      } else {
        user.resetToken = sha.digest('hex');
        user.resetExpiry = Date.now() + 86400000;
        user
          .save()
          .then(() => {
            // Send email
            sendgrid.send({
              to: req.body.email,
              from: 'no-reply@cheapcheep.life',
              subject: 'Reset your password',
              html: `<p>Hi, ${user.username}</p>
                <p>It's okay, we forget our passwords too sometimes!</p>
                <p>Please use this link to reset your password:</p>
                <p><a href="${req.protocol}://${req.headers.host}/password-reset/${user.resetToken}">${req.protocol}://${req.headers.host}/password-reset/${user.resetToken}</a></p>
                <p>It will expire in 24 hours.</p>
                <p>Thanks for living the Cheap Cheep life!</p>`
            });
            res.json({ message: 'Email sent.' });
          });
      }
    })
});

router.post('/reset', (req, res) => {
  if (req.body.password !== req.body.confirm) {
    res.status(400).json({ message: 'Passwords do not match.' });
  } else {
    models.user
      .findOne({
        where: {
          resetToken: req.body.token,
          resetExpiry: {
            $gt: Date.now()
          }
        }
      })
      .then((user) => {
        if (!user) {
          res.status(401).json({ message: 'Invalid or expired token' });
        } else {
          user.generateHash(req.body.password);
          user.resetToken = null;
          user.resetExpiry = null;
          user
            .save()
            .then(() => {
              // Send confirmation
              sendgrid.send({
                to: user.email,
                from: 'no-reply@cheapcheep.life',
                subject: 'Password reset',
                html: `<p>Hi, ${user.username}</p>
                  <p>Just letting you know your password has been reset.</p>
                  <p>Thanks for living the Cheap Cheep life!</p>`
              });
              res.json({ message: 'Password reset.' });
            });
        }
      });
  }
});

module.exports = router;