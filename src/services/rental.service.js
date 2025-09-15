import Rental from "../model/rental.model.js";
import Book from "../model/book.model.js";

export const rentBook = async(userId,bookId) => {
    const book = await Book.findById(bookId);
    if(!book) throw new Error("Book not found");

    const existing = await Rental.findOne({user: userId,book: bookId, returnAt: null});
    if(!existing) throw new Error("This book has already been rented");

    const rental = await Rental.create({user: userId, book: bookId});
    return rental;
};
