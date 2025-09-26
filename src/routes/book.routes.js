import express from "express";
import { createBook, getBooks, getBookById, updateBook, deleteBook } from "../controller/book.controller.js";
import * as bookController from "../controller/book.controller.js";
import { authMiddleWare, isAdmin } from "../middleware/auth.middleware.js";


const router = express.Router();

router.post("/", authMiddleWare,isAdmin, (req,res,next) => {
    if(req.user.role != "admin"){
        return res.status(403).json({error: "Only admin can create books"});
    }
    return bookController.createBook(req,res,next);

});
router.get("/", getBooks);
router.get("/:id", getBookById);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);


// router.get("/",getBooks);
// router.get("/:id",getBookById);

//protected -> only logged-in users can modify
router.post("/",authMiddleWare,isAdmin,createBook);
router.put("/:id",authMiddleWare,isAdmin,updateBook);
router.delete("/:id",authMiddleWare,isAdmin,deleteBook);

export default router;
