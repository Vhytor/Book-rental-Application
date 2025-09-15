import express from "express";
import { createBook, getBooks, getBookById, updateBook, deleteBook } from "../controller/book.controller.js";
import { authMiddleWare } from "../middleware/auth.middleware.js";


const router = express.Router();

router.post("/", createBook);
router.get("/", getBooks);
router.get("/:id", getBookById);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);


// router.get("/",getBooks);
// router.get("/:id",getBookById);

//protected -> only logged-in users can modify
router.post("/",authMiddleWare,createBook);
router.put("/:id",authMiddleWare,requiredRole("admin"),updateBook);
router.delete("/:id",authMiddleWare,requiredRole("admin"),deleteBook);

export default router;
