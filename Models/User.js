const { Schema, model } = require('mongoose');

// Schema to create user model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      max_length: 50,
      trimmed: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max_length: 50,
    },
    thoughts: [
      {
        type:Schema.Types.ObjectId,
        ref:"Thought"
      }
    ],
    friends: [ {
      type:Schema.Types.ObjectId,
      ref:"User"
    }],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const User = model('User', userSchema);

module.exports = User;
// username

// String
// Unique
// Required
// Trimmed
// email

// String
// Required
// Unique
// Must match a valid email address (look into Mongoose's matching validation)
// thoughts

// Array of _id values referencing the Thought model
// friends

// Array of _id values referencing the User model (self-reference)