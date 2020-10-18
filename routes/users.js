const route = require('express').Router();

route.get('/', async (req, res) => {
  try {
    res.send({
      hello: 'Dasha',
    })
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
});

module.exports = route;