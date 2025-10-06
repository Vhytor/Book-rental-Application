import rentalModel from "../model/rental.model.js";
import Rental from "../model/rental.model.js";

export const create = (data) => Rental.create(data);
export const findByUserAndBook = (userId,bookId) => Rental.findOne({
    user: userId,
    book: bookId,
    returnedAt: null
}).populate("book");
export const findByUser = (userId) => Rental.find({
    user: userId
}).populate("book");
export const findAll = () => Rental.find().populate("user").populate("book");
export const save = (Rental) => rentalModel.save();
export const findById = (id) => Rental.findById(id).populate("book").populate("user");
export const update = (id, data) => Rental.findByIdAndUpdate(id, data, { new: true });

