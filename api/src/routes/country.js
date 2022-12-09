const { Router } = require('express');
const { getAllPais, getPaisId } = require('../controllers/country')
const router = Router();

router.get('/', getAllPais);
router.get('/:id', getPaisId);

module.exports = router;

