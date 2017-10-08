const express = require('express');
const url = require('url');
const forwarded = require('forwarded-http/lib/middleware');

const router = express.Router();

const endpoints = [
  { name: 'auth' },
  { name: 'discounts' },
  { name: 'students' }
]

router.use(forwarded(), (req, res, next) => {
  req.href = url.format({
    protocol: req.forwarded.proto,
    host: req.forwarded.host,
    pathname: req.originalUrl + (req.originalUrl.endsWith("/") ? "" : "/"),
  });
  next();
});

/* GET all apis. */
router.get('/', (req, res) => {
  res.json(endpoints.map(endpoint => 
    Object.assign(endpoint, { href: `${req.href}${endpoint.name}` }
  )));
});

endpoints.forEach(endpoint => {
  const module = require(`./${endpoint.name}`);
  router.use('/' + endpoint.name, module);
})

module.exports = router;
