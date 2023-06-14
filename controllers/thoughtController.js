const {ObjectId} = require('mongoose').Types;
const {User, Thought, reactionSchema} = require('../models')

module.exports = {
    async getAllThoughts(req,res){
        try{
            const allThoughts = await Thought.find();
            return res.status(200).json(allThoughts);
        }catch(err){
            return res.status(500).json(err.message);
        }
    },
    async getSingleThought(req,res){
        try{
            const thought = await Thought.findById(req.params.id)
            if (!thought){
                return res.status(404).json({message:"No thought with that ID"})
            }
            return res.status(200).json(thought);
        }catch(err){
            return res.status(500).json(err.message);
        }
    },
    async createThought(req,res){
        try{
            const thought = await Thought.create(req.body);
            await User.findByIdAndUpdate(req.body.userId, {$push:{thoughts:thought._id}}, {new:true});
            return res.status(201).json(thought);
        }catch(err){
            return res.status(400).json(err.message);
        }
    },
    async updateThought(req,res){
        try{
            const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, {new:true})
            return thought ? res.status(201).json(thought) : res.status(404).json({message:"No thought with that ID"})
        }catch(err){
            return res.status(400).json(err.message);
        }
    },
    async deleteThought(req,res){
        try{
            const thought = await Thought.findByIdAndDelete(req.params.id);

            return thought ? 
                res.status(200).json({message: "Deleted"})
                : res.status(404).json({message:"No thought with that ID"})
        }catch(err){
            return res.status(400).json(err.message);
        }
    },
    async createReaction(req,res){
        try{
            const reaction = req.body;
            const thought = await Thought.findByIdAndUpdate(
                req.params.id,
                {$addToSet:{reactions:req.body}},
                {new:true}
            )
            if (thought){
                return res.status(202).json(thought);
            }else{
                return res.status(404).json({message:"No thought with that ID"})
            }
        }catch(err){
            return res.status(500).json(err.message);
        }
    },
    async deleteReaction(req,res){
        try{
            const thought = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                {$pull:{reactions:{_id:req.params.reactionId}}},
                {new:true}
            )
            if (thought){
                return res.status(202).json(thought);
            }else{
                return res.status(404).json({message:"No thought with that ID"})
            }
        }catch(err){
            return res.status(500).json(err.message);
        }
    }
}