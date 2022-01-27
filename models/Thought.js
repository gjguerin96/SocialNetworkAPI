const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      min_length: 1,
      max_length: 280
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
  }
);

const reactionSchema = new Schema(
    {
        reactionId: {
            //
        },
        reactionBody: {
            type: String,
            required: true,
            max_length: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    } 
)
//   .virtual('reactionCount')
  
//   .get(function () {
//     return friends.length;
//   })

const Thought = model('thought', thoughtSchema);

module.exports = Thought;