import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as userRepo from "../repositories/user.repository.js";



export const registerUser = async ({ username, first_name, last_name, email, password, role = "user" }) => {
  const existing = await userRepo.findByEmail(email);
  if (existing) throw new Error("User with this email already exists");

  const hashedPassword = await bcrypt.hash(password, 10);

  return userRepo.create({
    username,first_name,last_name, email, password: hashedPassword,role

  });
};

export const loginUser = async ({ email, password }) => {
  const user = await userRepo.findByEmail(email);
  if (!user) throw new Error("Email not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  // Generate JWT
  const token = jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return { token, user };
};

export const changePassword = async (userId,{ oldPassword, newPassword }) => {
  const user = await userRepo.findById(userId);
  if (!user) throw new Error("User not found");

  // Check if old password matches
  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) throw new Error("Old password does not match");

  // Hash the new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // user.password = hashedPassword;
  // await user.save();

  await userRepo.updatePassword(userId, hashedPassword);

  return { message: "Password changed successfully" };
};
