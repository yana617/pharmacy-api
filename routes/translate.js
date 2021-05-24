const route = require('express').Router();

const accessKeyRequired = require('../middlewares/accessKeyRequired');
const validateLanguage = require('../middlewares/validateLanguage');
const { translates } = require('../db/translates');

route.get('/:collection', accessKeyRequired, validateLanguage, async (req, res) => {
  try {
    const { collection } = req.params;
    if (!translates[collection]) {
      return res.status(400).json({
        success: false,
        error: 'Unsupported collection',
      });
    }

    const { lang } = req.query;
    res.json({ success: true, collection: translates[collection][lang] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = route;
