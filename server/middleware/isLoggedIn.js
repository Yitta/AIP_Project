function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.status(401).json('Unauthorized - Not logged in');
}

module.exports = isLoggedIn;
