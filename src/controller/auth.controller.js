import * as authService from "../services/auth.service.js";
import * as userRepo from "../repositories/user.repository.js";


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
    const data = await authService.loginUser(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const changePassword = async (req,res) => {
  try{
    const userId = req.user.id; //from authMiddleware
    const {oldPassword, newPassword} = req.body;
    
    if(!oldPassword || !newPassword){
       return res.status(400).json({error: "Both old and new passwords are required"});
    }
   
    const data = await authService.changePassword(userId,{ oldPassword, newPassword });
    res.status(200).json(data);

  }catch (err){
    res.status(500).json({error: err.message});
  }
};

export const forgotPassword = async (req, res) => {
  try{
    const{email} = req.body;
    const result = await authService.forgotPassword(email);
    res.json(result);
  }catch(error){
    res.status(400).json({error: error.message});
  }

};

export const resetPassword = async (req, res) => {
  try{
    const {token, newPassword} = req.body;
    const result = await authService.resetPassword(token, newPassword);
    res.json(result);
  }catch(error){
    res.status(400).json({error: error.message});

  }
};