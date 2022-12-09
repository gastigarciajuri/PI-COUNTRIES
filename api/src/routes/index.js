const { Router } = require('express');
const country = require("./country.js");
const activity = require("./activity.js");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.use("/country", country);
router.use("/activity", activity);


module.exports = router;
