const { trusted } = require('mongoose');
const {User, Thought} = require('../models')

module.exports = {
    
    getThoughts(req, res) {
      Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
    
    getSingleThought(req, res) {
      Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v')
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with that ID' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    
    createThought(req, res) {
      Thought.create(req.body)
        .then((thought) => {
            return User.findOneAndUpdate({username: req.body.username}, {$push: { thoughts: thought._id}}, {new: true}).then((user)=>{
                if (!user){
                    return res.status(400).json({message: "no username found"})
                }
                res.json({message: "thought created"})
            })
        })
        .catch((err) => res.status(500).json(err));
    },
    
    deleteThought(req, res) {
      Thought.findOneAndDelete({ _id: req.params.thoughtId }) 
        .then((thought) => {
           if(!thought) {
               res.status(404).json({ message: 'No thought with that ID' })
           } 
           res.json({ message: 'Thought deleted!' })
        })
        .catch((err) => res.status(500).json(err));
    },

    updateThought(req, res) {
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      )
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with this id!' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },

    addReaction(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $addToSet: {reactions: req.body} },
          { runValidators: true, new: true }
        )
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with this id!' })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },

    removeReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: {reactions: req.body} },
            { runValidators: true, new: true }
        )
            .then((thought) =>
            !thought
                ? res.status(404).json({ message: 'No thought with this id!' })
                : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
  };