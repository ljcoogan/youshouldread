import express from "express";
import * as controller from "../controllers/user.controller.js";

const router = express.Router();

router.get("/names", controller.getNames);

export default router;
