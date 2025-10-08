import mongoose from "mongoose";




const paymentSchema = new mongoose.Schema({
    user: {type:mongoose.Schema.Types.ObjectId, ref:"User", required: true},
    rental: {type:mongoose.Schema.Types.ObjectId, ref:"Rental", required: true},
    amount: {type: Number, required: true},
    status: {type: String, enum:["pending", "success", "failed"], default: "pending"},
    reference: {type: String, unique: true},
    paymentDate: {type: Date, default: Date.now},


}, {timestamps: true});


export default mongoose.model("Payment", paymentSchema);