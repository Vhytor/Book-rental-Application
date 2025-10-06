import express from "express";
import {
  rentBook,
  returnBook,
  getUserRentals,
  getAllRentals,
} from "../controller/rental.controller.js";
import * as rentalController from "../controller/rental.controller.js";
import { authMiddleWare, isAdmin } from "../middleware/auth.middleware.js";


const router = express.Router();

router.post("/:bookId", authMiddleWare, rentalController.rentBook);
router.put("/:bookId/return", authMiddleWare, rentalController.returnBook);
router.get("/me", authMiddleWare, rentalController.getUserRentals);
router.get("/", authMiddleWare, isAdmin, rentalController.getAllRentals);

export default router;