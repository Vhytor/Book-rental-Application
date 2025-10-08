import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bookRoutes from "./routes/book.routes.js";
import authRoutes from "./routes/auth.routes.js";
import rentalRoutes from "./routes/rental.routes.js";
import paymentRoutes from "./routes/payment.routes.js";



dotenv.config();



const app = express();

//middleware
// Add raw body parser for debugging
app.use(express.raw({ type: '*/*', limit: '10mb' }));

// Add middleware to log raw request body
app.use((req, res, next) => {
  const contentType = req.headers['content-type'] || '';
  console.log('Request Content-Type:', contentType);
  
  if (req.body && Buffer.isBuffer(req.body)) {
    const rawBody = req.body.toString('utf8');
    console.log('Raw request body:', rawBody);
    
    try {
      if (contentType.includes('application/json')) {
        req.body = JSON.parse(rawBody);
      } else if (contentType.includes('application/x-www-form-urlencoded')) {
        // Parse form data manually
        const bodyParams = new URLSearchParams(rawBody);
        req.body = {};
        for (const [key, value] of bodyParams.entries()) {
          req.body[key] = value;
        }
      }
    } catch (error) {
      console.error('Body parsing error:', error);
      return res.status(400).json({ error: 'Invalid request body format' });
    }
  }
  
  next();
});

// Standard body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add global error handler for JSON parsing errors
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error('JSON Parse Error:', err);
    return res.status(400).json({ error: 'Invalid JSON in request body' });
  }
  next(err);
});

//Routes
app.use("/api/auth",authRoutes);
app.use("/api/books",bookRoutes);
app.use("/api/rentals", rentalRoutes);
app.use("/api/payments", paymentRoutes);



//Start Server
const PORT = process.env.PORT || 5000;
console.log("🔍 MONGO_URI:", process.env.MONGO_URI);


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    console.log("✅ Routes loaded: /api/books, /api/auth, /api/rentals");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));