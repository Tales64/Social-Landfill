const router = require('express').Router();
const {
  createReacton,
  deleteReacton,
} = require('../../controllers/thoughtController.js');

// /api/Thought
router.route('/').get(getReactons).post(createReacton);

// /api/Thought/:ReactonId
router
  .route('/:ReactonId')
  .delete(deleteReacton);

module.exports = router;