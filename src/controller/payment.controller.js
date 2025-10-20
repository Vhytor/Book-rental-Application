import * as paymentService from "../services/payment.service.js";
import * as paymentRepo from "../repositories/payment.repository.js";



export const initiatePayment = async (  req, res) => {
    try{
        const {rentalId , amount} = req.body;
        const user = req.user;

        if(!rentalId || !amount){
            return res.status(400).json({error: "Rental ID and amount are required"});
        }

        const payment = await paymentService.initiatePayment(user,rentalId,amount);

        return res.status(200).json({
            message: "Payment initiated", ...payment,
            authorization_url: payment.authorization_url,
            reference: payment.reference,
        });
    }catch (err){
        console.log("payment initiation error",err);
        res.status(500).json({error: err.message});
    }
};

export const verifyPayment = async (req,res) => {
    try{
        const {reference} = req.query;
        if(!reference){
            return res.status(400).json({error: "Reference is required"});
        }
        
        const paymentData = await paymentService.verifyPayment(reference);
        console.log("payment data",paymentData);
        
        if(paymentData.status === "success"){
            await paymentRepo.updatePaymentStatus(reference, "success");
            return res.status(200).json({message: "Payment verification successful", data: paymentData});


        }

        await paymentRepo.updatePaymentStatus(reference, "failed");
        res.status(400).json({message: "Payment verification failed", data: paymentData});
    }catch (err){
        console.log("payment verification error",err);
        res.status(500).json({message: err.message});
    }
};