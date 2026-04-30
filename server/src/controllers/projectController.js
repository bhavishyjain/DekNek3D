import { ProjectNote } from "../models/ProjectNote.js";

export const getProjects = async (req, res) => {
  const projects = await ProjectNote.find({ user: req.user._id }).sort({
    createdAt: -1,
  });

  return res.status(200).json(projects);
};

export const createProject = async (req, res) => {
  const { title, description, status } = req.body;

  if (!title || !description) {
    return res
      .status(400)
      .json({ message: "Title and description are required" });
  }

  const project = await ProjectNote.create({
    user: req.user._id,
    title,
    description,
    status,
  });

  return res.status(201).json(project);
};

export const updateProject = async (req, res) => {
  const project = await ProjectNote.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!project) {
    return res.status(404).json({ message: "Project note not found" });
  }

  project.title = req.body.title ?? project.title;
  project.description = req.body.description ?? project.description;
  project.status = req.body.status ?? project.status;

  const updatedProject = await project.save();
  return res.status(200).json(updatedProject);
};

export const deleteProject = async (req, res) => {
  const project = await ProjectNote.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!project) {
    return res.status(404).json({ message: "Project note not found" });
  }

  return res.status(200).json({ message: "Project note deleted" });
};
