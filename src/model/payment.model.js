import mongoose from "mongoose";




const paymentSchema = new mongoose.Schema({
    user: {type:mongoose.Schema.Types.ObjectId, ref:"User", required: true}
});