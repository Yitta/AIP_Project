const express = require('express');
const models = require('../models');
const isLoggedIn = require('../middleware/isLoggedIn');
const checkRole = require('../middleware/checkRole');

const router = express.Router();

/* GET all users. */
router.get('/', isLoggedIn, checkRole.isAdmin, (req, res) => {
  const startAt = parseInt(req.query.startAt) || 0;
  const max = parseInt(req.query.max) || 25;
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
// TODO: Delete associated data
router.delete('/:id', isLoggedIn, checkRole.isAdmin, (req, res) => {
  models.users
    .destroy({
      where: { id: req.params.id }
    })
    .then((result) => res.status(204));
});

module.exports = router;