import express from "express";
import * as controller from "../controllers/book.controller.js";

const router = express.Router();

router.get("/", controller.getBooks);
router.post("/", controller.postBook);

router.get("/u/:username", controller.getBooksByUser);
router.get("/:isbn", controller.getMetadataFromIsbn);

export default router;
