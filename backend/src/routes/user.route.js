import express from "express";
import * as controller from "../controllers/user.controller.js";
import bookRouter from "../routes/book.route.js";

const router = express.Router();

router.get("/displayName", controller.getDisplayName);
router.use("/books", bookRouter);

export default router;
