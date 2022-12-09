const { Router } = require('express');
const { actiNueva, getAct } = require('../controllers/activities');

const router = Router();

router.post('/', actiNueva);
router.get('/', getAct)


module.exports = router;