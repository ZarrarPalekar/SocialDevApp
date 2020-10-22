const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  text: {
    type: String,
    required: true,
  },
  name: {
    // name of the user
    type: String,
  },
  avatar: {
    type: String,
  },
  likes: [
    {
      user: {
        // user who liked
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    },
  ],
  comments: [
    {
      user: {
        // user who commented
        type: Schema.Types.ObjectId,
        ref: "user",
      },
      text: {
        type: String,
        required: true,
      },
      name: {
        // name of the user
        type: String,
      },
      avatar: {
        type: String,
      },
      date: {
        // date of comment on the post
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    // date of actual post
    type: Date,
    default: Date.now,
  },
});

module.exports = Post = mongoose.model("post", PostSchema);
