import express from "express";
import contactCtrl from "../controllers/contact.controller.js";

const router = express.Router();

router.route("/")
  .post(contactCtrl.create)
  .get(contactCtrl.list);

router.route("/:id")
  .delete(contactCtrl.remove);

export default router;
