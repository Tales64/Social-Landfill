const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);
router.use('/testing', (req,res)=>res.send("testing"));

router.use((req, res) => res.send('Wrong route!'));

module.exports = router;
