const express = require('express');
const models = require('../models');
const isLoggedIn = require('../middleware/isLoggedIn');
const checkRole = require('../middleware/checkRole');

const router = express.Router();

/* GET all discounts that match the search criteria */
router.get('/search', (req, res) => {
  const startAt = req.query.startAt || 0;
  const max = Math.min(25, req.query.max || 25);
  models.discount
    .findAndCountAll({
      where: {
        $or: [{
          title: {
            $like: `%${req.query.query}%`
          }
        }, {
          description: {
            $like: `%${req.query.query}%`
          }
        }]
      },
      offset: startAt,
      limit: max,
      order: [['created_at', 'DESC']]
    })
    .then((results) => res.json({
      startAt: startAt,
      total: results.count,
      max: max,
      discounts: results.rows
    }));
});

/* GET all discounts */
router.get('/', (req, res) => {
  const startAt = parseInt(req.query.startAt) || 0;
  const max = parseInt(req.query.max) || 25;
  console.log(startAt);
  console.log(max);
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
router.post('/', isLoggedIn, checkRole.isNotStudent, (req, res) => {
  const discountJson = req.body;
  discountJson.creatorId = req.user.id;

  models.discount
    .create(discountJson)
    .then((discount) => res.status(201).json(discount));
});

/* GET a discount */
router.get('/:id', (req, res) => {
  models.discount
    .findById(req.params.id)
    .then((discount) => {
      let response = {
        discount: discount,
        canEdit: false
      }

      if (req.user && (req.user.id === discount.creatorId || req.user.accountType === 'admin')) {
        response.canEdit = true;
      }

      res.json(response);
    });
});

/* PUT edit a discount */
router.put('/:id', isLoggedIn, checkRole.isNotStudent, (req, res) => {
  // Check if user is discount owner or admin
  models.discount
    .findById(req.params.id)
    .then((discount) => {
      if (discount.creatorId === req.user.id || req.user.accountType === 'admin') {
        models.discount
          .update(req.body, {
            where: { id: req.params.id }
          })
          .then(() => {
            models.discount
              .findById(req.params.id)
              .then((updatedDiscount) => res.json(updatedDiscount));
          });
      } else {
        res.status(401).json({ message: `Unauthorized - Can't edit this discount.` });
      }
    });
});

/* DELETE a discount */
router.delete('/:id', isLoggedIn, (req, res) => {
  models.discount
    .findById(req.params.id)
    .then((discount) => {
      // Check if user is discount owner or admin
      if (discount.creatorId === req.user.id || req.user.accountType === 'admin') {
        models.discount
          .destroy({
            where: { id: req.params.id }
          })
          .then((result) => res.status(204).json({ message: 'Successfully deleted.' }));
      } else {
        res.status(401).json({ message: `Unauthorized - Can't delete this discount.` });
      }
  });
});

/* GET all ratings on a discount */
router.get('/:id/ratings', (req, res) => {
  const startAt = req.query.startAt || 0;
  const max = Math.min(25, req.query.max || 25);
  models.rating
    .findAndCountAll({
      where: { discount_id: req.params.id },
      offset: startAt,
      limit: max,
      order: [['created_at', 'DESC']]
    })
    .then((results) => res.json({
      startAt: startAt,
      total: results.count,
      max: max,
      comments: results.rows
    }));
});

/* POST a ratings on a discount */
router.post('/:id/ratings', isLoggedIn, checkRole.isStudent, (req, res) => {
  models.rating
    .create({
      discountId: req.params.id,
      userId: req.user.id,
      rating: req.body.rating,
      comment: req.body.comment
    })
    .then((comment) => res.status(201).json(comment));
});

module.exports = router;