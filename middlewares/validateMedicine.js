const { MEDICINES_TYPES, MEDICINES_CLASSES } = require('../db/constants');

module.exports = async (req, res, next) => {
  const requiredFields = ['name', 'expiration_date', 'count', 'type', 'class'];
  if (!req.body) {
    return res.status(400).json({
      success: false,
      error: `Provide medicine's required fields: ${requiredFields.join(', ')}`,
    });
  }

  const errors = requiredFields.reduce((result, field) => {
    if (!req.body[field]) {
      result.push(field);
    }
    return result;
  }, []);

  if (errors.length) {
    return res.status(400).json({ success: false, error: `Provide medicine's ${errors.join(', ')} fields` });
  }

  if (!MEDICINES_TYPES.includes(req.body.type)) {
    return res.status(400).json({
      success: false,
      error: `Unsupported type of medicine. Allowed: ${MEDICINES_TYPES.join(', ')}`,
    });
  }

  if (!MEDICINES_CLASSES.includes(req.body.class)) {
    return res.status(400).json({
      success: false,
      error: `Unsupported class of medicine. Allowed: ${MEDICINES_CLASSES.join(', ')}`,
    });
  }

  return next();
};
