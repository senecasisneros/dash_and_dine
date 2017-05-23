const express = require('express');
const router = express.Router();
import yelps from './yelps';
import weathers from './weathers';
import maps from './maps';

router.use('/yelps', yelps);
router.use('/weathers', weathers);
router.use('/maps', maps);
// router.use('/yelps', require('./yelps'));
// router.use('/weathers', require('./weathers'));
// router.use('/maps', require('./maps'));

module.exports = router;
