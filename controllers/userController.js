const {Thought,User} = require("../models");


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
        if (!userData) {
          return res.status(404).json({ message: 'No user with that ID' });
        }
  
        res.json(userData);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    async deleteUser(req, res) {
      try{
        const user = await User.findByIdAndDelete(req.params.id);
        if (user){
            await Thought.deleteMany({
                username:user.username
            });
            return res.status(201).json({message:"user deleted"});
        }
        return res.status(404).json({message:"No user with that ID"})
    }catch(err){
        return res.status(400).json(err.message);
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
    async updateUser(req, res) {
      try {
        const user = await User.create(req.body);
        res.json(user);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    async addFriend(req,res){
      try{
          const user = await User.findByIdAndUpdate(req.params.userId,
              {$addToSet: {friends: req.params.friendId}}, {new:true})
              if (user){
                  return res.status(201).json(user)
              }
              return res.status(404).json({message:"No user with that ID"})
      }catch(err){
          return res.status(500).json(err.message)
      }
  },
  async deleteFriend(req,res){
      try{
          const user = await User.findByIdAndUpdate(req.params.userId,
              {$pull: {friends: req.params.friendId}}, {new:true})
              if (user){
                  return res.status(201).json(user)
              }
              return res.status(404).json({message:"No user with that ID"})
      }catch(err){
          return res.status(500).json(err.message)
      }
  }
    };

    