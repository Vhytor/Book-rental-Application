
import * as authService from "../services/auth.service.js";

export const register = async (req, res) => {
  try {
    const result = await authService.registerUser(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await authService.loginUser(email, password);
    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};