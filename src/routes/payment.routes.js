
const router = express.Router();

router.post("/initiate", paymentController.initiatePayment);
router.get("/verify", paymentController.verifyPayment);

export default router;

