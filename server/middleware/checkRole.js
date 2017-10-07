function isStudent(req, res, next) {
  if (req.user.accountType !== 'student') {
    return next();
  }

  res.status(401).json('Unauthorized - Is not a student account');
}

function isNotStudent(req, res, next) {
  if (req.user.accountType !== 'student') {
    return next();
  }

  res.status(401).json('Unauthorized - Is a student account');
}

function isAdmin(req, res, next) {
  if (req.user.accountType === 'admin') {
    return next();
  }

  res.status(401).json('Unauthorized - Not an admin');
}

module.exports = {
  isStudent,
  isNotStudent,
  isAdmin
};