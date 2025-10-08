

export const initiatePayment = async (user,rentaId,amount) => {
    const response = await axios.post(
        "https://api.paystack.co/transaction/initialize",
        {
            email: user.email,
            amount: amount * 100,
            callback_url: '${process.env.BASE_URL}/api/payments/verify',
        },
        {
        headers: {
            Authorization: 'Bearer ${process.env.PAYSTACK_SECRET_KEY}',
        },

        }

    );
}