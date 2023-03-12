const withAuth = (req, res, next) => {
  if (!req.session.loggedIn) {
    res.redirct('/login');
  } else {
    next();
  }
};

module.exports = withAuth;
