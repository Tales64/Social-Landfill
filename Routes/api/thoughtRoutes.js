const router = require('express').Router();
const {
  getAllThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require('../../controllers/thoughtController.js');

// /api/Thoughts
router.route('/').get(getAllThoughts).post(createThought);



//delete thought by id 
router.route('/:thoughtId').get(getSingleThought).delete(deleteThought).put(updateThought);


//create a reaction to a specific thought
router.route('/:thoughtId/reactions').post(createReaction)

//delete a reaction by it's id from a specific thought
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction)
// /api/Thoughts/:ThoughtId
module.exports = router;