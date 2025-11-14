import Qualification from "../models/qualification.model.js";
import mongoose from "mongoose";

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

const loadById = async (req, res, next, id) => {
  try {
    if (!isValidId(id)) return res.status(400).json({ error: "Invalid ID" });
    const doc = await Qualification.findById(id);
    if (!doc) return res.status(404).json({ error: "Qualification not found" });
    req.doc = doc;
    next();
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const create = async (req, res) => {
  try {
    const q = new Qualification(req.body);
    const saved = await q.save();
    return res.status(201).json(saved);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const list = async (_req, res) => {
  try {
    const docs = await Qualification.find().sort({ completion: -1, _id: -1 });
    return res.json(docs);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const read = async (req, res) => res.json(req.doc);

const update = async (req, res) => {
  try {
    Object.assign(req.doc, req.body);
    const updated = await req.doc.save();
    return res.json(updated);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const remove = async (req, res) => {
  try {
    await req.doc.deleteOne();
    return res.json({ message: "Qualification deleted" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const removeAll = async (_req, res) => {
  try {
    const result = await Qualification.deleteMany({});
    return res.json({ deletedCount: result.deletedCount });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export default { loadById, create, list, read, update, remove, removeAll };
