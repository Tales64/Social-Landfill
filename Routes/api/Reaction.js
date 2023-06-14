const router = require('express').Router();
const {
  getReactions,
  createReaction,
  deleteReaction,
} = require('../../controllers/thoughtController.js');

// /api/Thought
router.route('/').get(getReactions).post(createReaction);

// /api/Thought/:ReactonId
router
  .route('/:ReactonId')
  .delete(deleteReaction);

module.exports = router;