import User from "../model/user.model.js";


export const create = async (data) => User.create(data);
export const findByEmail = async (email) => {
  return User.findOne({ email });
};
export const findById = (id) => User.findById(id);

