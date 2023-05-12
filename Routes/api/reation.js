const router = require('express').Router();
const {
  createReacton,
  deleteReacton,
} = require('../../controllers/ReactonController.js');

// /api/Reactons
router.route('/').get(getReactons).post(createReacton);

// /api/Reactons/:ReactonId
router
  .route('/:ReactonId')
  .delete(deleteReacton);

module.exports = router;