const express = require('express');
const models = require('../models');

const router = express.Router();

/* GET all discounts */
router.get('/', (req, res) => {
  const startAt = req.query.startAt || 0;
  const max = Math.min(25, req.query.max || 25);
  models.discount
    .findAndCountAll({
      offset: startAt,
      limit: max
    })
    .then((results) => res.json({
      startAt: startAt,
      total: results.count,
      max: max,
      discounts: results.rows
    }));
});

/* POST a new discount. */
// TODO: Edit this so only admins and businesses can access
router.post('/', (req, res) => {
  models.discount
    .create(req.body)
    .then((discount) => res.status(201).json(discount));
});

/* GET a discount */
router.get('/:id', (req, res) => {
  models.discount
    .findById(req.params.id)
    .then((discount) => res.json(discount));
});

/* PUT edit a discount */
// TODO: Edit this so only admins and the person who created the discount can access
router.put('/:id', (req, res) => {
  models.discount
    .update(
      req.body,
      { where: { id: req.params.id } }
    )
    .then((discount) => res.json(discount));
});

/* DELETE a discount */
// TODO: Edit this so only admins and the person who created the discount can access
router.delete('/:id', (req, res) => {
  models.movie
    .destroy({
      where: { id: req.params.id }
    })
    .then((result) => res.status(204));
});

router.get('/:id/comments', (req, res) => {
  const startAt = req.query.startAt || 0;
  const max = Math.min(25, req.query.max || 25);
  models.comment
    .findAndCountAll({
      where: { discount_id: req.params.id },
      offset: startAt,
      limit: max
    })
    .then((results) => res.json({
      startAt: startAt,
      total: results.count,
      max: max,
      comments: results.rows
    }));
});

router.post('/:id/comments', (req, res) => {
  models.comment
    .create({
      discount_id: req.params.id,
      user_id: req.body.userId,
      comment: req.body.comment
    })
    .then((comment) => res.status(201).json(comment));
});

module.exports = router;