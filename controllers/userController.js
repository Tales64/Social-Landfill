const {Thought,User} = require("./models");

const userCount = async () => {
    const numberOfUsers = await User.aggregate()
    .count('userCount');
  return numberOfUsers;
}

module.exports = {
    // Get all users
    async getUsers(req, res) {
      try {
        const userData = await User.find();
        res.json(userData);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    // Get a single user
    async getSingleUser(req, res) {
      try {
        const userData = await User.findOne({ _id: req.params.id })
          .select('-__v');
  
        if (!userData) {
          return res.status(404).json({ message: 'No user with that ID' });
        }
  
        res.json(userData);
      } catch (err) {
        res.status(500).json(err);
      }
    },

    // create a new user
    async createUser(req, res) {
      try {
        const user = await User.create(req.body);
        res.json(user);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    async addThought(req, res) {
        console.log('You are adding an thought');
        console.log(req.body);
    
        try {
          const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { thoughts: req.body } },
            { runValidators: true, new: true }
          );
    
          if (!user) {
            return res
              .status(404)
              .json({ message: 'No user found with that ID :(' });
          }
    
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
      },
      // Remove thought from a user
      async removeThought(req, res) {
        try {
          const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { thought: { thoughtId: req.params.thoughtId } } },
            { runValidators: true, new: true }
          );
    
          if (!user) {
            return res
              .status(404)
              .json({ message: 'No user found with that ID :(' });
          }
    
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
      },
    };