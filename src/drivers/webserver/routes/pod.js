const router = require('express').Router();

const getPods = require('../controllers/pod/get-pods');
const postPod = require('../controllers/pod/post-pod');

router.get('/', getPods);
router.post('/', postPod);

module.exports = router;
