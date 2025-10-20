import axios from "axios";
import * as paymentRepo from "../repositories/payment.repository.js";




export const initiatePayment = async (user,rentalId,amount) => {
    const response = await axios.post(
        "https://api.paystack.co/transaction/initialize",
        {
            email: user.email,
            amount: amount * 100,
            callback_url: `${process.env.BASE_URL}/api/payments/verify`,
        },
        {
        headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },

        }

    );

    const data = response.data.data;

    await paymentRepo.createPayment({
        user: user.id,
        rental: rentalId,
        amount,
        reference: data.reference,
    });
    return {Authorization: data.authorization_url, reference:data.reference};
};

export const verifyPayment = async (reference) => {
    const response = await axios.get(
        `https://api.paystack.co/transaction/verify/${reference}`,
        {
            headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
            }
        }
    );
    return response.data.data;

};