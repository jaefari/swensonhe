const router = require('express').Router();

const getMachines = require('../controllers/machine/get-machines');
const postMachine = require('../controllers/machine/post-machine');

router.get('/', getMachines);
router.post('/', postMachine);

module.exports = router;
