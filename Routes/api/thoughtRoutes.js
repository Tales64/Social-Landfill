const router = require('express').Router();
const thoughts = require('../../controllers/thoughtController');

// get all thoughts
router.get('/', thoughts.getAllThoughts);

//get single thought by id
router.get('/:id', thoughts.getSingleThought);

//create new thought attached to user
router.post('/', thoughts.createThought);

//update existing thought by id
router.put('/:id', thoughts.updateThought);

//delete thought by id 
router.delete('/:id', thoughts.deleteThought)

//create a reaction to a specific thought
router.post('/:id/reactions', thoughts.createReaction)

//delete a reaction by it's id from a specific thought
router.delete('/:thoughtId/reactions/:reactionId', thoughts.deleteReaction)

module.exports = router;