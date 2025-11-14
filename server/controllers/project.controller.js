import Project from "../models/project.model.js";
import errorHandler from "../helpers/dbErrorHandler.js";

const create = async (req, res) => {
  try {
    const project = new Project({
      ...req.body,
      postedBy: req.auth._id
    });
    await project.save();
    res.status(200).json(project);
  } catch (err) {
    res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const list = async (req, res) => {
  try {
    const projects = await Project.find({ postedBy: req.auth._id });
    res.json(projects);
  } catch (err) {
    res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const read = async (req, res) => {
  return res.json(req.project);
};

const projectById = async (req, res, next, id) => {
  try {
    const project = await Project.findById(id);
    if (!project) return res.status(404).json({ error: "Project not found" });
    req.project = project;
    next();
  } catch (err) {
    return res.status(400).json({ error: "Could not retrieve project" });
  }
};

const update = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.project._id,
      req.body,
      { new: true }
    );
    res.json(project);
  } catch (err) {
    res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const remove = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.project._id);
    res.json(project);
  } catch (err) {
    res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

export default {
  create,
  list,
  read,
  remove,
  update,
  projectById,
};
