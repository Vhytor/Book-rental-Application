import { registerUser, loginUser } from "../services/auth.service.js"



export const register = async (req, res) => {
    try{
        console.log('Register request body:', req.body);
        
        // Check if req.body is undefined or not an object
        if (!req.body || typeof req.body !== 'object') {
            return res.status(400).json({ error: "Invalid request body format" });
        }
        
        // Extract fields, ensuring they are strings
        const username = req.body.username ? String(req.body.username) : undefined;
        const email = req.body.email ? String(req.body.email) : undefined;
        const password = req.body.password ? String(req.body.password) : undefined;
        
        console.log('Extracted registration data types:', { 
            usernameType: typeof username, 
            emailType: typeof email, 
            passwordType: typeof password 
        });
        
        if (!username || !email || !password) {
            return res.status(400).json({ error: "Username, email, and password are required" });
        }
        
        const user = await registerUser({ username, email, password });
        res.status(201).json({message: "User registered", user});
    }catch(err){
        console.error('Registration error:', err);
        res.status(400).json({error: err.message})
    }
};

export const login = async (req, res) => {
  try {
    console.log('Login request body:', req.body);
    const { email, password } = req.body || {}; // ✅ safe destructure
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const { token, user } = await loginUser({ email, password });
    res.json({ message: "Login successful", token, user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};