import mongoose from "mongoose";

const rentalSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true,
    },
    rentDate: {
        type: Date,
        default: Date.now,
    },
    returnDate: {
        type: Date,
    },


});


export default mongoose.model("Rental",rentalSchema);
