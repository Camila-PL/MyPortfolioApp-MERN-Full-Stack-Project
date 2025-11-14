import express from "express";
import qualificationCtrl from "../controllers/qualification.controller.js";

const router = express.Router();

router.route("/")
  .post(qualificationCtrl.create)
  .get(qualificationCtrl.list)
  .delete(qualificationCtrl.removeAll);

router.route("/:id")
  .get(qualificationCtrl.read)
  .put(qualificationCtrl.update)
  .delete(qualificationCtrl.remove);

router.param("id", qualificationCtrl.loadById);

export default router;
