import * as bookService from "../services/book.service.js";

export const createBook = async (req, res) => {
  try {
    if(req.user.role !== "admin"){
      return res.status(403).json({error: "Access Denied"});
    }
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
