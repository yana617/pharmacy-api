module.exports = async (req, res, next) => {
  if (!req.body || !req.body.name) {
    return res.status(400).json({ success: false, error: 'Provide app name' });
  }

  if (typeof req.body.name !== 'string') {
    return res.status(400).json({ success: false, error: 'Name must be string' });
  }

  return next();
};
