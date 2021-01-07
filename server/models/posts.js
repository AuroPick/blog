import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  message: {
    type: String,
    required: true,
  },

  creator: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  specialPost: {
    type: Boolean,
    default: false,
  },
});

var Post = mongoose.model("Post", postSchema);

export default Post;
