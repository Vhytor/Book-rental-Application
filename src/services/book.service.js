import { createBookRepo, getBooksRepo, getBookByIdRepo, updateBookRepo, deleteBookRepo } from "../repositories/book.repository.js";



export const createBookService = async (data) => {
    return await createBookRepo(data);
};

export const getBooksService = async () => {
    return await getBooksRepo();
};

export const getBookByIdService = async (id) => {
    return await getBookByIdRepo(id);
};

export const updateBookService = async (id,data) => {
    return await updateBookRepo(id,data);
};

export const deleteBookService = async (id) => {
    return await deleteBookRepo(id);
};





