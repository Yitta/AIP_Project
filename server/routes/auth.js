const express = require('express');
const models = require('../models');
const passport = require('passport');

const router = express.Router();

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



module.exports = router;