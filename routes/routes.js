const { googleSheet, view } = require('../controllers/googleSheet');
const { Router } = require('express');
const router = Router();

router.get('/', view)

router.post('/', googleSheet);


module.exports = router;