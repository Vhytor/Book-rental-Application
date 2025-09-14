import mongoose from "mongoose";


const bookSchema = new mongoose.Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    available: {type: Boolean, default: true},
    rentedBy: {type:String, default: null},
},{timestamps: true});

export default mongoose.model("Book",bookSchema);
