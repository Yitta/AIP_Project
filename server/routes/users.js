const express = require('express');
const models = require('../models');
const isLoggedIn = require('../middleware/isLoggedIn');
const checkRole = require('../middleware/checkRole');

const router = express.Router();

/* GET all users. */
router.get('/', isLoggedIn, checkRole.isAdmin, (req, res) => {
  const startAt = req.query.startAt || 0;
  const max = Math.min(25, req.query.max || 25);
  models.users
    .findAndCountAll({
      offset: startAt,
      limit: max
    })
    .then((results) => res.json({
      startAt: startAt,
      total: results.count,
      max: max,
      users: results.rows
    }));
});

/* DELETE a user */
// TODO: Edit this so only admins and the person who created the discount can access
// TODO: Delete associated data
router.delete('/:id', isLoggedIn, (req, res) => {
  models.movie
    .destroy({
      where: { id: req.params.id }
    })
    .then((result) => res.status(204));
});

module.exports = router;