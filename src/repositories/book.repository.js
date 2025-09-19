import bookModel from "../model/book.model.js"


export const createBookRepo = async (data) => {
    return await bookModel.create(data);
};

export const getAllBooks = async () => {
    return await bookModel.find();
};

export const getBookByIdRepo = async (id) => {
    return await bookModel.findById(id);
};

export const updateBookRepo = async (id,data) => {
    return await bookModel.findByIdAndUpdate(id,data, {new: true});
};

export const deleteBookRepo = async (id) => {
    return await bookModel.findByIdAndDelete(id);
};

