import User from "../model/user.model.js";


export const create = (data) => User.create(data);
export const findByEmail = (email) => User.findOne({email});
export const findById = (id) => User.findById(id);

