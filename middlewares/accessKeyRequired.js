const App = require('../models/app');

module.exports = async (req, res, next) => {
  const access_key = req.headers['access-key'];
  if (!access_key) {
    return res.status(400).json({
      success: false,
      error: 'No access key provided',
    });
  }

  const app = await App.findOne({ access_key });
  if (!app) {
    return res.status(400).json({
      success: false,
      error: 'App with such access key not found',
    });
  }

  req.app = app;
  return next();
};
