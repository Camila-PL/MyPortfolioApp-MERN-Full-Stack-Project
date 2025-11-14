import Contact from "../models/contact.model.js";

const create = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    return res.status(200).json(contact);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const list = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return res.json(contacts);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const remove = async (req, res) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);
    return res.json(deleted);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export default { create, list, remove };
