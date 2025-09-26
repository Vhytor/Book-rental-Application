import jwt from "jsonwebtoken";

export const authMiddleWare = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if(!authHeader) return res.status(401).json({error: "No authorization header"});


    const token = req.headers.authorization?.split(" ")[1];
    if(!token) return res.status(401).json({error: "No token provided"});

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();

    }catch(err){
        res.status(401).json({error: "Invalid or expired token"});
    }
};

export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") return res.status(403).json({ error: "Forbidden" });
  next();
};