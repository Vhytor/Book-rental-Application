

export const createPayment = async (data) => await Payment.create(data);
export const findByReference = async (ref) => await Payment.findOne({ reference: ref });
export const updatePaymentStatus = async (ref, status) =>
  await Payment.findOneAndUpdate({ reference: ref }, { status, paymentDate: new Date() }, { new: true });
