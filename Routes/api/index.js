const router = require('express').Router();
const thoughtRoutes = require('./Thought');
const userRoutes = require('./User');

router.use('/thought', thoughtRoutes);
router.use('/user', userRoutes);

module.exports = router;
