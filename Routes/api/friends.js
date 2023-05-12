const router = require('express').Router();
const {
  getFriends,
  getSingleFriend,
  createFriend,
  deleteFriend,
} = require('../../controllers/FriendController.js');

// /api/Friends
router.route('/').get(getFriends).post(createFriend);

// /api/Friends/:FriendId
router
  .route('/:FriendId')
  .get(getSingleFriend)
  .put(updateFriend)
  .delete(deleteFriend);

module.exports = router;