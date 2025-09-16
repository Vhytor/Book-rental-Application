// import { createBookService, getBooksService, getBookByIdService, updateBookService, deleteBookService } from "../services/book.service.js"



// export const createBook = async (req, res) => {
//     try{
//         const book = await createBookService(req.body);
//         res.status(201).json(book);
//     }catch(error){
//         res.status(400).json({message: error.message});

//     }
// };

// export const getBooks = async (req, res) => {
//     const books = await getBooksService();
//     res.json(books);

// };

// export const getBookById = async (req, res) => {
//     try{
//         const book = await getBookByIdService(req.params.id);
//         if(!book) return res.status(404).json({message: "Book not found"});
//         res.json(book);
//     }catch{
//         res.status(400).json({message: "Invalid id" });
//     }
// };

// export const updateBook = async (req, res) => {
//     try{
//         const book = await updateBookService(req.params.id, req.body);
//         if(!book) return res.status(404).json({message: "Book not found"});
//         res.json(book);
//     }catch{
//         res.status(400).json({message: "Invalid id" });

//     }
// };

// export const deleteBook = async (req, res) => {
//     try{
//         const book = await deleteBookService(req.params.id);
//         if(!book) return res.status(404).json({message: "Book not found"});
//         res.json({message: "Book deleted"});
//     }catch{
//         res.status(400).json({message: "Invalid id" });
//     }
// };


import * as bookService from "../services/book.service.js";

export const createBook = async (req, res) => {
  try {
    const book = await bookService.createBook(req.body);
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getBooks = async (req, res) => {
  try {
    const books = await bookService.getBooks();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getBookById = async (req, res) => {
  try {
    const book = await bookService.getBookById(req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateBook = async (req, res) => {
  try {
    const book = await bookService.updateBook(req.params.id, req.body);
    res.json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteBook = async (req, res) => {
  try {
    await bookService.deleteBook(req.params.id);
    res.json({ message: "Book deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
