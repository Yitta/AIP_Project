const express = require('express');
const models = require('../models');

const router = express.Router();

/* POST a new student. */
router.post('/', (req, res) => {
  models.student
    .create(req.body)
    .then((student) => res.status(201).json(student));
});

/* GET a student */
router.get('/:id', (req, res) => {
  models.student
    .findById(req.params.id)
    .then((student) => res.json(student));
});

/* PUT edit a student */
// TODO: Edit this so only admins and the student can access
router.get('/:id', (req, res) => {
  models.student
    .update(
      req.body,
      { where: { id: req.params.id } }
    )
    .then((student) => res.json(student));
});

module.exports = router;