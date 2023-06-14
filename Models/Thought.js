const Mongoose = require('mongoose');
const moment = require('moment');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Mongoose.Schema(
    {
        thoughtText:{
            type:String,
            required:true,
            validate:{
                validator: value => {
                    return value.length >=1 && value.length <=280
                },
                message:"thoughtText must be between 1 and 280 characters"
            }
        },
        createdAt:{
            type:Date,
            default: Date.now(),
            get: value => {
                return moment(value).local().format("MMM Do YYYY, h:mm:ss a");
            }
        },
        username:{
            type:String,
            required:true
        },
        reactions:[reactionSchema]
    }
);

thoughtSchema.virtual('reactionCount')
    .get(()=>{this.reactions.length})
    
const Thought = Mongoose.model('Thought', thoughtSchema)

module.exports = Thought;