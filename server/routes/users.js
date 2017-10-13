const express = require('express');
const models = require('../models');
const isLoggedIn = require('../middleware/isLoggedIn');
const checkRole = require('../middleware/checkRole');

const router = express.Router();

/* GET all users. */
router.get('/', isLoggedIn, checkRole.isAdmin, (req, res) => {
  const startAt = req.query.startAt || 0;
  const max = Math.min(25, req.query.max || 25);
  models.user
    .findAndCountAll({
      offset: startAt,
      limit: max,
      attributes: {
        exclude: [ 'password' ]
      }
    })
    .then((results) => res.json({
      startAt: startAt,
      total: results.count,
      max: max,
      users: results.rows
    }));
});

/* GET all users that match the search criteria */
router.get('/search', (req, res) => {
  const startAt = req.query.startAt || 0;
  const max = Math.min(25, req.query.max || 25);
  models.user
    .findAndCountAll({
      where: {
        $or: [{
          username: {
            $like: `%${req.query.query}%`
          }
        }, {
          email: {
            $like: `%${req.query.query}%`
          }
        }]
      },
      offset: startAt,
      limit: max,
      order: [['createdAt', 'DESC']],
      attributes: {
        exclude: [ 'password' ]
      }
    })
    .then((results) => res.json({
      startAt: startAt,
      total: results.count,
      max: max,
      users: results.rows
    }));
});

/* GET a user */
router.get('/:id', (req, res) => {
  models.user
    .findById(req.params.id)
    .then((user) => res.json(user));
});

/* DELETE a user */
// TODO: Delete associated data
router.delete('/:id', isLoggedIn, checkRole.isAdmin, (req, res) => {
  models.user
    .destroy({
      where: { id: req.params.id }
    })
    .then((result) => res.status(204));
});

module.exports = router;