import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: "Title is required",
      trim: true
    },
    description: {
      type: String,
      required: "Description is required",
      trim: true
    },
    link: {
      type: String,
      trim: true
    },
    postedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Project", ProjectSchema);
