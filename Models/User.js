const Mongoose = require('mongoose');

const emailRegex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;

const userSchema = new Mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            trim:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            validate:{
                validator: value => { 
                    return emailRegex.test(value)
                },
                message: 'Invalid email address'
            }
        },
        thoughts:[{
            type: Mongoose.Schema.Types.ObjectId,
            ref: 'Thought'
        }],
        friends:[{
            type: Mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    {
        toJSON:{
            virtuals:true
        },
        id:false
    }
);

userSchema.virtual('friendCount')
    .get(function(){return this.friends.length})

const User = Mongoose.model('User', userSchema)

module.exports = User;