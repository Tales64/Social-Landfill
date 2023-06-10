const router = require('express').Router();
const thoughtRoutes = require('./Thought');
const userRoutes = require('./User');

router.use('/Thought', thoughtRoutes);
router.use('/User', userRoutes);

module.exports = router;
