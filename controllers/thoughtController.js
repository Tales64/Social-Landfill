const {Thought,User} = require("../models");

const userCount = async () => {
    const numberOfUsers = await User.aggregate()
    .count('userCount');
  return numberOfUsers;
}

module.exports = {
    // Get all thoughts
    async getThoughts(req, res) {
      try {
        const thoughts = await Thought.find();
  
        const thoughtObj = {
          thoughts,
          headCount: await headCount(),
        };
  
        res.json(thoughtObj);
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    },
    // Get a single thought
    async getSingleThought(req, res) {
      try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId })
          .select('-__v');
  
        if (!thought) {
          return res.status(404).json({ message: 'No thought with that ID' })
        }
  
        res.json({
          thought,
          grade: await grade(req.params.thoughtId),
        });
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    },
    // create a new thought
    async createThought(req, res) {
      try {
        const thought = await Thought.create(req.body);
        res.json(thought);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    async addThought(req, res) {
        console.log('You are adding an thought');
        console.log(req.body);
    
        try {
          const thought = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { thoughts: req.body } },
            { runValidators: true, new: true }
          );
    
          if (!thought) {
            return res
              .status(404)
              .json({ message: 'No thought found with that ID :(' });
          }
    
          res.json(thought);
        } catch (err) {
          res.status(500).json(err);
        }
      },
      // Remove thought from a thought
      async removeThought(req, res) {
        try {
          const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { thought: { thoughtId: req.params.thoughtId } } },
            { runValidators: true, new: true }
          );
    
          if (!thought) {
            return res
              .status(404)
              .json({ message: 'No thought found with that ID :(' });
          }
    
          res.json(thought);
        } catch (err) {
          res.status(500).json(err);
        }
      },
      async createReaction(req,res){
        try {
          const reaction = await Thought.create(req.body);
          res.json(thought);
        } catch (err) {
          res.status(500).json(err);
        }
      },
      async addReaction(req, res) {
          console.log('You are adding a thought');
          console.log(req.body);
      
          try {
            const reaction = await Thought.findOneAndUpdate(
              { _id: req.params.thoughtId },
              { $addToSet: { $push: { reaction:req.body }}},
              { runValidators: true, new: true }
            );
      
            if (!reaction) {
              return res
                .status(404)
                .json({ message: 'No reaction found with that ID :(' });
            }
      
            res.json(reaction);
          } catch (err) {
            res.status(500).json(err);
          }
        },
    };