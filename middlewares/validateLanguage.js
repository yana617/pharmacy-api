const { allowedLanguages } = require('../db/translates');

module.exports = async (req, res, next) => {
  if (!req.query || !req.query.lang) {
    return res.status(400).json({ success: false, error: 'Provide lang query' });
  }

  const { lang } = req.query;
  if (!allowedLanguages.includes(lang)) {
    return res.status(400).json({
      success: false,
      error: `This language is not supported. Supported languages: ${allowedLanguages.join(', ')}`,
    });
  }

  return next();
};
