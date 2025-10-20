import express from "express";
import {authMiddleWare} from "../middleware/auth.middleware.js";
import * as paymentController from "../controller/payment.controller.js";




const router = express.Router();

router.post("/initiate", authMiddleWare, paymentController.initiatePayment);
router.get("/verify", authMiddleWare, paymentController.verifyPayment);

export default router;

