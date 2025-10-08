


export const initiatePayment = async (  res, req) => {
    try{
        const {rentalId , amount} = req.body;
        const user = req.user;

        const payment = await paymentService.initiatePayment(user,rentalId,amount);
        res.json({message: "Payment initiated", ...payment});
    }catch (err){
        res.status(500).json({error: err.message});
    }
};

export const verifyPayment = async (res,req) => {
    try{
        const {reference} = req.query;

        const paymentData = await paymentService.verifyPayment(reference);
        if(paymentData.status === "success"){
            await paymentRepo.updatePaymentStatus(reference, "success");
        }
        await paymentRepo.updatePaymentStatus(reference, "failed");
        res.status(400).json({message: "Payment verification failed"});
    }catch (err){
        res.status(500).json({message: err.message});
    }
};