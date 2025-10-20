import express from "express";
import { register, login } from "../controller/auth.controller.js";
import { authMiddleWare } from "../middleware/auth.middleware.js";
import { createBook, getBookById, getBooks } from "../controller/book.controller.js";

const router = express.Router();

// Add middleware to log request body for debugging
router.use((req, res, next) => {
    console.log('Auth Route Request:', {
        method: req.method,
        path: req.path,
        body: req.body,
        contentType: req.headers['content-type']
    });
    next();
});

// Add a test endpoint to debug request format
router.post("/test-login", (req, res) => {
    console.log('Test login endpoint hit');
    console.log('Request headers:', req.headers);
    console.log('Request body (raw):', req.body);
    
    // Extract and validate email/password
    const email = req.body.email ? String(req.body.email) : undefined;
    const password = req.body.password ? String(req.body.password) : undefined;
    
    console.log('Extracted credentials:', { 
        emailType: typeof email, 
        passwordType: typeof password,
        emailValue: email,
        passwordValue: password ? '***' : undefined
    });
    
    // Return the parsed data
    res.json({
        received: {
            email: email,
            password: password ? '[REDACTED]' : undefined,
            emailType: typeof email,
            passwordType: typeof password
        }
    });
});

// Add a test endpoint to verify bcrypt functionality
router.post("/test-bcrypt", async (req, res) => {
    try {
        console.log('Test bcrypt endpoint hit');
        const bcrypt = require('bcryptjs');
        
        // Get password from request or use default
        const password = req.body.password ? String(req.body.password) : 'testpassword';
        
        // Hash the password
        console.log('Hashing password:', password);
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Hashed password:', hashedPassword);
        
        // Compare the password with the hash
        console.log('Comparing password with hash...');
        const isMatch = await bcrypt.compare(password, hashedPassword);
        console.log('Password match result:', isMatch);
        
        res.json({
            success: true,
            passwordLength: password.length,
            hashedPasswordLength: hashedPassword.length,
            isMatch: isMatch
        });
    } catch (error) {
        console.error('Bcrypt test error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});


router.post("/register", register);
router.post("/login", login);

router.put("/change-password",authMiddleWare, changePassword);

export default router;
