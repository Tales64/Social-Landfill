const router = require('express').Router();
const users = require('../../controllers/userController')

// get all users
router.get('/', users.getAllUsers);

//get specific user by id
router.get('/:id', users.getSingleUser);

//create new user
router.post('/', users.createUser);

//update existing user based on id
router.put('/:id', users.updateUser);

//delete user
router.delete('/:id', users.deleteUser)

//add a single friend based on id
router.post('/:userId/friends/:friendId', users.addFriend)

//delete friend based on id
router.delete('/:userId/friends/:friendId', users.deleteFriend)

module.exports = router;