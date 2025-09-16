import express from "express";
import {
  rentBook,
  returnBook,
  getUserRentals,
  getAllRentals,
} from "../controller/rental.controller.js";

import { authMiddleWare, isAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/:bookId", authMiddleWare, rentBook);
router.put("/:bookId/return", authMiddleWare, returnBook);
router.get("/me", authMiddleWare, getUserRentals);
router.get("/", authMiddleWare, isAdmin, getAllRentals);

export default router;