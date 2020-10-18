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

route.get('/yana', async (req, res) => {
  try {
    res.send({
      hello: 'Hello Yana I-m here',
    })
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
});

module.exports = route;