import mongoose from "mongoose";

const projectNoteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Planning", "In Progress", "Completed"],
      default: "Planning",
    },
  },
  {
    timestamps: true,
  }
);

export const ProjectNote = mongoose.model("ProjectNote", projectNoteSchema);
