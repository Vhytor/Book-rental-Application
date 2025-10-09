import paymentModel from "../model/payment.model.js"

export const createPayment = async (data) => await paymentModel.create(data);
export const findByReference = async (ref) => await paymentModel.findOne({ reference: ref });
export const updatePaymentStatus = async (ref, status) =>
  await paymentModel.findOneAndUpdate({ reference: ref }, { status, paymentDate: new Date() }, { new: true });
