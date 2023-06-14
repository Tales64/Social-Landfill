const {ObjectId} = require('mongoose').Types;
const {User, Thought, reactionSchema} = require('../models')

module.exports = {
    async getAllUsers(req,res){
        try{
            const allUsers = await User.find();
            return res.status(200).json(allUsers);
        }catch(err){
            return res.status(500).json(err.message);
        }
    },
    async getSingleUser(req,res){
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
    async createUser(req,res){
        try{
            const user = await User.create(req.body);
            return res.status(201).json(user);
        }catch(err){
            return res.status(400).json(err.message);
        }
    },
    async updateUser(req,res){
        try{
            const user = await User.findByIdAndUpdate(req.params.id, req.body, {new:true})
            return res.status(201).json(user);
        }catch(err){
            return res.status(400).json(err.message);
        }
    },
    async deleteUser(req,res){
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
}