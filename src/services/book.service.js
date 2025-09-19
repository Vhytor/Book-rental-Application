import * as bookRepo from "../repositories/book.repository.js";


export const createBook = (data) => bookRepo.createBookRepo(data);
export const getBooks = () => bookRepo.getAllBooks();
export const getBookById = (id) => bookRepo.getBookByIdRepo(id);
export const updateBook = (id, data) => bookRepo.updateBookRepo(id, data);
export const deleteBook = (id) => bookRepo.deleteBookRepo(id);


