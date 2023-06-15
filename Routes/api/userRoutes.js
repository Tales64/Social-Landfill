const router = require('express').Router();
const {
  getAllUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
  deleteFriend,
  addFriend,
} = require('../../controllers/userController.js');

// /api/Users
router.route('/').get(getAllUsers).post(createUser);

// /api/users/:userId
router.route('/:id').get(getSingleUser).delete(deleteUser).put(updateUser);

// // /api/users/:userId/thoughts
// router.route('/:userName/thoughts');

// // /api/users/:userId/thoughts/:thoughtId
router.route('/:userId/friends/:friendId').delete(deleteFriend).post(addFriend);

module.exports = router;