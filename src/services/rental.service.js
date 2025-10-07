import Rental from "../model/rental.model.js";
import Book from "../model/book.model.js";
import * as bookRepo from  "../repositories/book.repository.js";
import * as rentalRepo from "../repositories/rental.repository.js";

export const rentBook = async (userId, bookId) => {
    const book  = await bookRepo.getBookByIdRepo(bookId);
    if(!book) throw new Error("Book not found");
    // if(book.availableCopies < 1) throw new Error("No available copies");
    if (!book.available) throw new Error("Book already rented");

    const rental = await rentalRepo.create({
        user: userId,
        book: bookId,
        status: "rented",

    });

      // Update the book: mark unavailable + store rentedBy
    await bookRepo.updateBookRepo(bookId, {
        available: false,
        rentedBy: userId,
    });

    return rental;
};

export const returnBook = async (userId, bookId) => {
    const book = await bookRepo.getBookByIdRepo(bookId);
    if(!book) throw new Error("Book not found");

    const rental = await rentalRepo.findByUserAndBook(userId, bookId);
    if(!rental || rental.status === "returned") throw new Error("Rental not found");

    rental.status = "returned";
    rental.returnDate = new Date();
    await rental.save();

    await bookRepo.updateBookRepo(bookId, {
        available: true,
        rentedBy: null,

    });




    // const book = rentalRepo.findById(rental.book);
    // if(!book) throw new Error("Book not found");
    // book.availableCopies += 1;
    // await book.save();

    return rental;
};

export const getUserRentals = (userId) => rentalRepo.findByUser(userId);
export const getAllRentals = () => rentalRepo.findAll();



