const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        userName: 
        {
            type: String,
            unique: true,
            trim: true,
            required: true,
        },
        email: 
        {
            type: String,
            unique: true,
            required: true,
            // how to match?
        },
        thoughts: 
        [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
        friends:
        [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },

    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

userSchema.virtual("friendCount").get(function () {
    return this.friends.length;
});

const User = model("User", userSchema);
module.exports = User;