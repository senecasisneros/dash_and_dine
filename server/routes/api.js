const express = require('express');
const router = express.Router();

router.use('/yelps', require('./yelps'));
router.use('/weathers', require('./weathers'));
router.use('/maps', require('./maps'));

module.exports = router;
