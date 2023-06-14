const Mongoose = require('mongoose');
const moment = require('moment');

const reactionSchema = new Mongoose.Schema(
    {
        reactionId:{
            type:Mongoose.Schema.Types.ObjectId,
            default: Mongoose.Schema.Types.ObjectId
        },
        reactionBody:{
            type:String,
            require:true,
            validate:{
                validator: value => (value.length>=1 && value.length <= 280)
            }
        },
        username:{
            type:String,
            required:true
        },
        createdAt:{
            type:Date,
            default: Date.now(),
            get: value => {
                return moment(value).local().format("MMM Do YYYY, h:mm:ss a");
            }
        }
    }
);

module.exports = reactionSchema