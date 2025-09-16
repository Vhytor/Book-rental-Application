import Rental from "../model/rental.model.js";
import Book from "../model/book.model.js";
import * as bookRepo from  "../repositories/book.repository.js";
import * as rentalRepo from "../repositories/rental.repository.js";

// export const rentBook = async(userId,bookId) => {
//     const book = await Book.findById(bookId);
//     if(!book) throw new Error("Book not found");

//     const existing = await Rental.findOne({user: userId,book: bookId, returnAt: null});
//     if(!existing) throw new Error("This book has already been rented");

//     const rental = await Rental.create({user: userId, book: bookId});
//     return rental;
// };

export const rentBook = async (userId, bookId) => {
    const book  = await bookRepo.findById(bookId);
    if(!book) throw new Error("Book not found");

    const existing = await rentalRepo.findByUserAndBook(userId, bookId);
    if(existing) throw new Error(" You already rented this book ");
    
    return rentalRepo.create({user: userId, book: bookId});

};

export const returnBook = async (userId, bookId) => {
    const rental = await rentalRepo.findByUserAndBook(userId, bookId);
    if(!rental) throw new Error("Rental not found");

    rental.returnedAt = new Date();
    return rentalRepo.save(rental);

};

export const getUserRentals = (userId) => rentalRepo.findByUser(userId);
export const getAllRentals = () => rentalRepo.findAll();



