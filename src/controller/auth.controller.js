import * as authService from "../services/auth.service.js";
import userRepo from "../repositories/user.repository.js";


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
    const userId = req.user.id;
    const {oldPassword, newPassword} = req.body;

    if(!oldPassword || !newPassword){
      return res.status(400).json({error: "Old password and new password are required"});
    }

    const user = await userRepo.findById(userId);
    if(!user){
      return res.status(404).json({error: "User not found"});
    }
    // Check if old password matches
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if(!isMatch){
      return res.status(400).json({error: "Old password does not match"});
    }

    //Hash the new password
    const salt = await bcrypt.genSalt(10);
    userRepo.password = await bcrypt.hash(newPassword,salt);

    await userRepo.save();
    res.status(200).json({message: "Password changed successfully"});
}catch (err){
  res.status(500).json({error: err.message});
}

    
};