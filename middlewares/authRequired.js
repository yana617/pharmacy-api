module.exports = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized',
    });
  }

  next();
};
