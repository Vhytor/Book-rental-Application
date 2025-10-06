import * as rentalService from "../services/rental.service.js";

export const rentBook = async (req, res) => {
  try {
    const rental = await rentalService.rentBook(req.user.id, req.params.bookId);
    res.status(201).json(rental);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const returnBook = async (req, res) => {
  try {
    const rental = await rentalService.returnBook(req.user.id, req.params.bookId);
    res.json(rental);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getUserRentals = async (req, res) => {
  try {
    const rentals = await rentalService.getUserRentals(req.user.id);
    res.json(rentals);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllRentals = async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ error: "Access denied" });
    const rentals = await rentalService.getAllRentals();
    res.json(rentals);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};