const {Schema, model} = require('mongoose');
const moment = require('moment');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new SchemaTypes.ObjectId(),
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

const Reaction = model('Reaction', reactionSchema);
module.exports = Reaction;